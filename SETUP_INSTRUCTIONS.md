# Wyenfos React App - Setup Instructions

## Environment Setup

### 1. Client Setup (React App)

1. **Firebase Configuration:**
   - Copy `client/src/config/firebase.js.template` to `client/src/config/firebase.js`
   - Replace the placeholder values with your actual Firebase configuration
   - Get your Firebase config from Firebase Console > Project Settings > General > Your apps

### 2. Server Setup (Node.js/Express)

1. **Environment Variables:**
   - Copy `server/env.template` to `server/.env`
   - Fill in your Firebase Admin SDK credentials
   - Get these from Firebase Console > Project Settings > Service Accounts

2. **Firebase Admin SDK:**
   - Copy `server/config/firebase.js.template` to `server/config/firebase.js`
   - The actual configuration will be loaded from environment variables

## Security Notes

- **NEVER commit the following files to Git:**
  - `.env` files
  - `firebase.js` files (use templates instead)
  - Service account keys
  - API keys

- **Files that are automatically ignored:**
  - All `.env*` files
  - Firebase configuration files
  - Service account keys
  - API keys and secrets

## Getting Firebase Credentials

### For Client (Web App):
1. Go to Firebase Console
2. Select your project
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Copy the config object

### For Server (Admin SDK):
1. Go to Firebase Console
2. Select your project
3. Go to Project Settings > Service Accounts
4. Click "Generate new private key"
5. Download the JSON file
6. Extract the values and put them in your `.env` file

## Running the Application

### Client:
```bash
cd client
npm install
npm start
```

### Server:
```bash
cd server
npm install
npm start
```

## Important Security Reminders

- Keep your Firebase credentials secure
- Use environment variables for all sensitive data
- Never commit actual credentials to version control
- Use the template files provided for configuration
