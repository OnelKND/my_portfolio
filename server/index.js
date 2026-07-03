import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting storage
const rateLimitStore = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting middleware (10 attempts per minute per IP)
const rateLimit = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxAttempts = 10;

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { attempts: 1, resetTime: now + windowMs });
  } else {
    const data = rateLimitStore.get(ip);
    if (now > data.resetTime) {
      data.attempts = 1;
      data.resetTime = now + windowMs;
    } else {
      data.attempts++;
      if (data.attempts > maxAttempts) {
        return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans une minute.' });
      }
    }
  }
  next();
};

// Secure session store with cryptographic tokens
const sessions = new Map();

// Routes

// Sanitize input to prevent XSS
const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 10000); // Limit length
};

// Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// POST /api/contact - Submit a new message
app.post('/api/contact', rateLimit, (req, res) => {
  let { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Validate email
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  // Sanitize inputs
  name = sanitize(name);
  email = sanitize(email.toLowerCase());
  message = sanitize(message);

  try {
    const newMessage = db.addMessage(name, email, message);

    res.json({
      success: true,
      message: 'Message envoyé avec succès !',
      id: newMessage.id
    });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

// POST /api/admin/login - Admin login (with rate limiting)
app.post('/api/admin/login', rateLimit, (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Mot de passe requis' });
  }

  // Validate password length
  if (password.length < 6 || password.length > 100) {
    return res.status(400).json({ error: 'Mot de passe invalide' });
  }

  try {
    if (db.checkPassword(password)) {
      // Generate cryptographically secure token
      const token = crypto.randomUUID();
      sessions.set(token, { createdAt: Date.now() });

      res.json({ success: true, token });
    } else {
      res.status(401).json({ error: 'Mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur lors de l\'authentification' });
  }
});

// Middleware to check auth
const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !sessions.has(authHeader)) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  // Check session expiry (24 hours)
  const session = sessions.get(authHeader);
  if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
    sessions.delete(authHeader);
    return res.status(401).json({ error: 'Session expirée' });
  }

  next();
};

// GET /api/admin/messages - Get all messages (protected)
app.get('/api/admin/messages', requireAuth, (req, res) => {
  try {
    const messages = db.getMessages();

    res.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
  }
});

// DELETE /api/admin/messages/:id - Delete a message (protected)
app.delete('/api/admin/messages/:id', requireAuth, (req, res) => {
  const { id } = req.params;

  try {
    const success = db.deleteMessage(id);

    if (success) {
      res.json({ success: true, message: 'Message supprimé' });
    } else {
      res.status(404).json({ error: 'Message non trouvé' });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

// POST /api/admin/logout - Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    sessions.delete(authHeader);
  }
  res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});