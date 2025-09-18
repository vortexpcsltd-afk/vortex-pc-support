import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

    // Use type-safe logging
    console.log('Firebase Config:', {
      apiKey: !!firebaseConfig.apiKey,
      projectId: firebaseConfig.projectId,
      fullConfig: Object.fromEntries(
        Object.entries(firebaseConfig).map(([key, value]) => [key, value ? 'PRESENT' : 'MISSING'])
      )
    });

    if (!firebaseConfig.apiKey) {
      console.error('Firebase API Key is missing!');
      return null;
    }

    try {
      const app = initializeApp(firebaseConfig);
      return getFirestore(app);
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return null;
    }
  }
  return null;
};

export const db = initFirebase();
