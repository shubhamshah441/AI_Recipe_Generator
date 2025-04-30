// Import the functions you need from the SDKs you need
// src\components\firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsDvJJICjPfXswBDSn2yUnDi5V13WDvHM",
  authDomain: "recipe-generator-c4e5c.firebaseapp.com",
  projectId: "recipe-generator-c4e5c",
  storageBucket: "recipe-generator-c4e5c.appspot.com", 
  messagingSenderId: "1009182162706",
  appId: "1:1009182162706:web:e40f4589169b3c7dbf3dcb",
  measurementId: "G-SJSGD1Y0VQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // ✅ Add Google Auth Provider
export const db = getFirestore(app); // ✅ Export Firestore
export default app;
