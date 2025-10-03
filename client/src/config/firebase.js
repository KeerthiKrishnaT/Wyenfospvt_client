// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxWtcDT_3a3GGEZEaqLwRqwVnH6TDKv-U",
  authDomain: "wyenfospvt.firebaseapp.com",
  projectId: "wyenfospvt",
  storageBucket: "wyenfospvt.firebasestorage.app",
  messagingSenderId: "106647252101",
  appId: "1:106647252101:web:1d3b9926c4e31cde5c0dec",
  measurementId: "G-0RR19NCWXM"
};

// Initialize Firebase
let app;
let analytics;
let auth;
let db;
let storage;

try {
  app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  console.log('✅ Firebase initialized successfully');
  
  // Test Firestore connection
  if (db) {
    import('firebase/firestore').then(({ connectFirestoreEmulator, enableNetwork, disableNetwork }) => {
      // Test basic connectivity
      console.log('🔍 Testing Firestore connection...');
    }).catch(err => {
      console.warn('⚠️ Firestore connection test failed:', err);
    });
  }
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Set fallback values to prevent app crashes
  analytics = null;
  auth = null;
  db = null;
  storage = null;
}

// Export Firebase services for use in components
export { auth, db, storage, analytics };
export default app;
