import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const initFirebase = () => {
  if (typeof window !== 'undefined') {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    console.log('Firebase Config Debug:', {
      projectId: firebaseConfig.projectId,
      hasApiKey: !!firebaseConfig.apiKey,
      hasAuthDomain: !!firebaseConfig.authDomain,
      allConfigPresent: Object.values(firebaseConfig).every(val => !!val),
      fullConfig: JSON.stringify(firebaseConfig, null, 2),
      envVars: {
        apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      }
    });

    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      console.log('Firebase initialized successfully with config:', firebaseConfig.projectId);
      return db;
    } catch (error) {
      console.error('Detailed Firebase Initialization Error:', error);
      return null;
    }
  }
  return null;
};

export const db = initFirebase();
