// Firebase Core
import { initializeApp } from "firebase/app";


import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqNzZBqLbkeFXnI6U7BpSTwfayZQaiys0",
  authDomain: "everhack1-5ca01.firebaseapp.com",
  projectId: "everhack1-5ca01",
  storageBucket: "everhack1-5ca01.firebasestorage.app",
  messagingSenderId: "721089082087",
  appId: "1:721089082087:web:8bdaba8ae1394d19d76842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);
