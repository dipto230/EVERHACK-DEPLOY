// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "everhack1-5ca01.firebaseapp.com",
  projectId: "everhack1-5ca01",
  storageBucket: "everhack1-5ca01.firebasestorage.app",
  messagingSenderId: "721089082087",
  appId: "1:721089082087:web:8bdaba8ae1394d19d76842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}