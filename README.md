# site-vitrine-exemple1

## Objectif

Ce projet met en place un site vitrine complet :
- pages de services et de réalisations,
- espace d'administration pour gérer le contenu,
- prise en charge d'un mode sombre.

## Installation

### API
```bash
cd my-api
npm install
npm run dev
```

### Application React
```bash
cd my-app
npm install
npm start
```

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `DB_HOST` | Hôte de la base de données MySQL |
| `DB_USER` | Utilisateur de la base de données |
| `DB_PASS` | Mot de passe de la base de données |
| `DB_NAME` | Nom de la base de données |
| `JWT_SECRET` | Clé secrète utilisée pour signer les JSON Web Tokens |
| `PORT` | Port d'écoute de l'API |
| `REACT_APP_API_URL` | URL de l'API consommée par l'application React |

### Port par défaut

Le projet utilise le port **5000** pour l'API. L'application React consomme cette API via l'URL `http://localhost:5000` définie dans `REACT_APP_API_URL`.

## Authentification administrateur

L'espace d'administration utilise désormais l'**email** et le mot de passe de l'utilisateur pour se connecter.

### Migration de la table `users`

Une migration SQL est fournie pour renommer la colonne `username` en `email` et ajouter une contrainte d'unicité :

```sql
ALTER TABLE users
  CHANGE COLUMN username email VARCHAR(255) NOT NULL,
  ADD UNIQUE KEY unique_email (email);
```

Exécuter cette migration avec :

```bash
mysql -u <user> -p <db_name> < my-api/migrations/001_use_email_for_admin.sql
```

## Formulaire de contact

L'API fournit une route `POST /contact` pour permettre aux visiteurs d'envoyer un message.

### Requête

```json
{
  "name": "Jean Dupont",
  "email": "jean@example.com",
  "message": "Bonjour"
}
```

Les champs sont validés et nettoyés avant l'enregistrement en base de données.

### Réponses

- `201` : message enregistré.
- `400` : données invalides.
- `500` : erreur serveur.

## Scripts disponibles

### API (`my-api`)
- `npm run start` : lance l'API en mode production.
- `npm run dev` : lance l'API avec rechargement automatique (nodemon).
- `npm test` : script de test placeholder.

### Application (`my-app`)
- `npm start` : démarre l'application React en mode développement.
- `npm run build` : construit l'application pour la production.
- `npm test` : exécute la suite de tests.
- `npm run eject` : éjecte la configuration par défaut.

## Arborescence
```
site-vitrine-exemple1/
├── my-api/
│   ├── server.js
│   └── package.json
├── my-app/
│   ├── public/
│   ├── src/
│   └── package.json
├── LICENSE
└── README.md
```
