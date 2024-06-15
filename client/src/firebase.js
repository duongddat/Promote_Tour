// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-tour-bc817.firebaseapp.com",
  projectId: "mern-tour-bc817",
  storageBucket: "mern-tour-bc817.appspot.com",
  messagingSenderId: "327688303265",
  appId: "1:327688303265:web:decc8a0552a6f749a336e0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
