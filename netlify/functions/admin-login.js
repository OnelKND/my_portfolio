const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, '..', '..', 'database.json');

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

const SALT = 'portfolio-secure-salt-2024';

function verifyPassword(password, storedHash) {
  const newHash = crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
  return newHash === storedHash;
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
  if (record.count > RATE_LIMIT_MAX) {
    return false;
  }
  return true;
}

// Session store (in-memory, note: resets on cold starts)
const sessions = new Map();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  if (!checkRateLimit(ip)) {
    return { statusCode: 429, body: JSON.stringify({ error: 'Trop de tentatives. Réessayez dans une minute.' }) };
  }

  try {
    const { password } = JSON.parse(event.body);

    if (!password || password.length < 6 || password.length > 100) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Mot de passe invalide' }) };
    }

    const data = initDB();

    if (verifyPassword(password, data.admin.password)) {
      const token = crypto.randomUUID();
      sessions.set(token, { createdAt: Date.now() });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, token })
      };
    } else {
      return { statusCode: 401, body: JSON.stringify({ error: 'Mot de passe incorrect' }) };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur lors de l\'authentification' }) };
  }
};