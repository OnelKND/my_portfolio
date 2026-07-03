import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_FILE = join(__dirname, 'messages.json');

// Default admin password (CHANGE THIS IN PRODUCTION)
const DEFAULT_PASSWORD = 'change-me-in-production';

// Static salt for hashing (change this to a unique value in production)
const SALT = 'portfolio-secure-salt-2024';

// Hash password with SHA-256
function hashPassword(password) {
  return crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
}

// Verify password
function verifyPassword(password, hash) {
  const newHash = crypto.pbkdf2Sync(password, SALT, 100000, 64, 'sha512').toString('hex');
  return newHash === hash;
}

// Initialize data structure
const defaultData = {
  messages: [],
  admin: {
    password: hashPassword(DEFAULT_PASSWORD)
  }
};

// Load or create database
function loadData() {
  if (!existsSync(DB_FILE)) {
    saveData(defaultData);
    return defaultData;
  }

  try {
    const content = readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading database:', error);
    return defaultData;
  }
}

// Save data to file
function saveData(data) {
  try {
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    return false;
  }
}

// Get all messages
export function getMessages() {
  const data = loadData();
  return data.messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// Add a new message
export function addMessage(name, email, message) {
  const data = loadData();
  const newMessage = {
    id: Date.now().toString(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  data.messages.push(newMessage);
  saveData(data);

  return newMessage;
}

// Delete a message
export function deleteMessage(id) {
  const data = loadData();
  const index = data.messages.findIndex(m => m.id === id);

  if (index === -1) {
    return false;
  }

  data.messages.splice(index, 1);
  saveData(data);

  return true;
}

// Check admin password (hashed)
export function checkPassword(password) {
  const data = loadData();
  return verifyPassword(password, data.admin.password);
}

// Get admin password (for changing)
export function getAdminPassword() {
  const data = loadData();
  return data.admin.password;
}

// Set admin password (hash it before saving)
export function setAdminPassword(newPassword) {
  const data = loadData();
  data.admin.password = hashPassword(newPassword);
  return saveData(data);
}

export default {
  getMessages,
  addMessage,
  deleteMessage,
  checkPassword,
  getAdminPassword,
  setAdminPassword
};