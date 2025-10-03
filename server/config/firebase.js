const admin = require('firebase-admin');
require('dotenv').config();

// Check if Firebase is configured
const isFirebaseConfigured = process.env.FIREBASE_PROJECT_ID && 
                            process.env.FIREBASE_PRIVATE_KEY && 
                            process.env.FIREBASE_CLIENT_EMAIL;

if (isFirebaseConfigured) {
  // Initialize Firebase Admin SDK
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
} else {
  console.log('⚠️  Firebase not configured. Some features will be disabled.');
  console.log('   Please set up your Firebase environment variables in server/.env');
  
  // Initialize with default app (for development)
  try {
    admin.initializeApp();
  } catch (error) {
    // App already initialized
  }
}

// Export Firebase services
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  auth,
  storage
};
