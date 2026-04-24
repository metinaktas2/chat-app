// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//!auth import
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//!database import
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-9f9c8.firebaseapp.com",
  projectId: "chat-9f9c8",
  storageBucket: "chat-9f9c8.firebasestorage.app",
  messagingSenderId: "530238863276",
  appId: "1:530238863276:web:115b571a97a04e5164ac09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//! auth servisinin referansını al
export const auth = getAuth(app);

//!google sağlayıcısının kurulumu
export const provider = new GoogleAuthProvider();

//!veritabanı seervisinin referansını al
export const db = getFirestore(app);
