// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMCVgB9uj5Eg_e0iI3-oBPRgOde54Cfu0",
  authDomain: "twitter-clone-6f618.firebaseapp.com",
  projectId: "twitter-clone-6f618",
  storageBucket: "twitter-clone-6f618.firebasestorage.app",
  messagingSenderId: "30380489673",
  appId: "1:30380489673:web:1b3a50b07b9b8da0378618",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);

export const db = getFirestore(app);
