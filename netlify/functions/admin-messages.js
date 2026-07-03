const fs = require('fs');
const path = require('path');

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

// In-memory session store
const sessions = new Map();

function verifySession(token) {
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
    sessions.delete(token);
    return false;
  }
  return true;
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  const authHeader = event.headers.authorization;

  if (!authHeader || !verifySession(authHeader)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Non autorisé' }) };
  }

  try {
    const data = initDB();
    const messages = data.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, messages })
    };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur serveur' }) };
  }
};