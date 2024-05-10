import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/database"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAIMg80y7-8uAkeBXRD6K28ZS60JvGXpP0",
  authDomain: "vendor-72d63.firebaseapp.com",
  projectId: "vendor-72d63",
  storageBucket: "vendor-72d63.appspot.com",
  messagingSenderId: "382968659188",
  appId: "1:382968659188:web:b6d4d26253d728de0832a1",
  measurementId: "G-9ZWQER8C8L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firedb = getDatabase(app);
export const database = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;