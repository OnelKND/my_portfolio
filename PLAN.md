# Plan: Page Admin pour les messages de contact

## Objectif
Créer un système pour recevoir et gérer les messages du formulaire de contact via une page admin sécurisée.

## Architecture

```
Frontend (React/Vite)          Backend (Express + SQLite)
┌─────────────────┐            ┌─────────────────────┐
│  Contact Form  │────POST───>│  /api/contact       │
│  (sur le site) │            │  (enregistre msg)   │
└─────────────────┘            └─────────────────────┘
                                      │
                                      ▼
┌─────────────────┐            ┌─────────────────────┐
│  /admin (page)  │<──GET────│  /api/messages       │
│  (authentifiée) │          │  (protégé par mot    │
└─────────────────┘            │  de passe)          │
                               └─────────────────────┘
```

## Étapes d'implémentation

### 1. Installer les dépendances backend
- `express` - serveur web
- `better-sqlite3` - base de données SQLite
- `cors` - autoriser les requêtes cross-origin
- `dotenv` - variables d'environnement

### 2. Créer le serveur backend
**Fichier: `server/index.js`**
- Express server sur port 3001
- Routes API avec CORS activé
- Middleware JSON

### 3. Configurer la base de données
**Fichier: `server/db.js`**
- Table `messages` avec:
  - id (INTEGER PRIMARY KEY)
  - name (TEXT)
  - email (TEXT)
  - message (TEXT)
  - created_at (DATETIME)
- Table `admin` avec:
  - id, password_hash

### 4. Créer les routes API
- `POST /api/contact` - recevoir et sauvegarder un message
- `GET /api/messages` - récupérer tous les messages (protégé)
- `POST /api/admin/login` - authentification simple

### 5. Modifier le formulaire de contact
**Fichier: `src/components/Contact.tsx`**
- Remplacer le mailto par un appel API
- Ajouter feedback visuel (loading, succès, erreur)

### 6. Créer la page admin
**Fichier: `src/components/Admin.tsx`**
- Page accessible via /admin
- Login avec mot de passe
- Liste des messages reçus
- Option pour supprimer un message

### 7. Ajouter la route admin
**Fichier: `src/App.tsx`**
- Route `/admin` qui rend la page admin

### 8. Configurer le dev server
**Fichier: `vite.config.ts`**
- Proxy API vers le backend en développement

## Fichiers à créer/modifier

### Nouveaux fichiers:
- `server/index.js` - serveur Express
- `server/db.js` - configuration SQLite
- `server/package.json` - dépendances backend
- `src/components/Admin.tsx` - page admin

### Fichiers à modifier:
- `package.json` - ajouter scripts dev
- `src/components/Contact.tsx` - appeler l'API
- `src/App.tsx` - ajouter route /admin
- `vite.config.ts` - proxy API

## Authentification
- Mot de passe stocké en variable d'environnement (ADMIN_PASSWORD)
- Simple token JWT ou session pour la session admin
- Le mot de passe par défaut sera à changer lors du premier déploiement

## Temps estimé
- Backend + DB: 30 min
- Formulaire contact: 15 min
- Page admin: 30 min
- Tests: 15 min