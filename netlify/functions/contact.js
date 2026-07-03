const fs = require('fs');
const path = require('path');
const https = require('https');

const DB_FILE = path.join(__dirname, '..', '..', 'database.json');

// Free JSONBin.io API (you can replace with your own key)
const JSONBIN_APP_ID = 'YOUR_JSONBIN_APP_ID'; // Optional - works without it for basic usage

function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const crypto = require('crypto');
    const SALT = 'portfolio-secure-salt-2024';
    const hashPassword = (pwd) => crypto.pbkdf2Sync(pwd, SALT, 100000, 64, 'sha512').toString('hex');

    const data = {
      messages: [],
      admin: {
        password: hashPassword('Neladmin@07')
      }
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Hash password
function hashPassword(password) {
  const crypto = require('crypto');
  const SALT = 'portfolio-secure-salt-2024';
  return crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
}

function verifyPassword(password, storedHash) {
  const crypto = require('crypto');
  const SALT = 'portfolio-secure-salt-2024';
  const newHash = crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
  return newHash === storedHash;
}

// Sanitize
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 10000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Rate limiting
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  record.count++;
  if (record.count > RATE_LIMIT_MAX) return false;
  return true;
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  if (!checkRateLimit(ip)) {
    return { statusCode: 429, body: JSON.stringify({ error: 'Trop de tentatives. Réessayez dans une minute.' }) };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Tous les champs sont requis' }) };
    }

    if (!isValidEmail(email)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email invalide' }) };
    }

    const sanitizedName = sanitize(name);
    const sanitizedEmail = sanitize(email.toLowerCase());
    const sanitizedMessage = sanitize(message);

    // For local development, use file
    const data = initDB();
    const newMessage = {
      id: Date.now().toString(),
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      createdAt: new Date().toISOString()
    };

    data.messages.push(newMessage);
    saveDB(data);

    // Note: For production on Netlify, you would need an external database
    // Options: JSONBin.io (free), MongoDB Atlas (free), or just use Netlify Forms

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Message envoyé avec succès !',
        id: newMessage.id
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur serveur' }) };
  }
};