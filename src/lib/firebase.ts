import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration before init
const validateConfig = (config: typeof firebaseConfig) => {
  const missingKeys = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    console.error('❌ Missing Firebase configuration keys:', missingKeys);
    throw new Error(`Missing Firebase config: ${missingKeys.join(', ')}`);
  }

  console.log('✅ Firebase Configuration Validation:', {
    projectId: config.projectId,
    configComplete: Object.values(config).every((value) => !!value),
  });
};

validateConfig(firebaseConfig);

// Initialise only once
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Firestore instance
export const db: Firestore = getFirestore(app);

// Optional: connect to emulator in dev
if (process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  console.log('🔥 Connected to Firestore emulator');
}
