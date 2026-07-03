const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_FILE = path.join(__dirname, '..', '..', 'database.json');

function initDB() {
  if (!fs.existsSync(DB_FILE)) {
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
  if (event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Méthode non autorisée' }) };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader || !verifySession(authHeader)) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Non autorisé' }) };
  }

  try {
    // Extract ID from path: /admin-messages/123 -> 123
    const pathParts = event.path.split('/');
    const id = pathParts[pathParts.length - 1];

    const data = initDB();
    const index = data.messages.findIndex(m => m.id === id);

    if (index === -1) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Message non trouvé' }) };
    }

    data.messages.splice(index, 1);
    saveDB(data);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Message supprimé' })
    };
  } catch (error) {
    console.error('Error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Erreur serveur' }) };
  }
};