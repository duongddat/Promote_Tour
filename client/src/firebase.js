// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuIyergOcYWxrfRkO8a4AU4fP70mfUATA",
  authDomain: "mern-tour-bc817.firebaseapp.com",
  projectId: "mern-tour-bc817",
  storageBucket: "mern-tour-bc817.appspot.com",
  messagingSenderId: "327688303265",
  appId: "1:327688303265:web:decc8a0552a6f749a336e0",
  measurementId: "G-S8E3PYSGES",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPID_KEY_MESSEAG,
      });
      if (token) {
        return token;
      } else {
        console.log("No registration token available.");
      }
    } else {
      console.log("Permission not granted.");
    }
  } catch (error) {
    console.log(error);
  }
};
