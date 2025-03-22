// firebase.ts (configuración Firebase)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMqblE5TsFz6l5ub53oh5tDPRmPFgdUw8",
  authDomain: "digital-house-pf.firebaseapp.com",
  projectId: "digital-house-pf",
  storageBucket: "digital-house-pf.firebasestorage.app",
  messagingSenderId: "114605514341",
  appId: "1:114605514341:web:1c8f433a20039bbd14308c",
  measurementId: "G-0RRGG63659",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
