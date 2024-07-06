importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCuIyergOcYWxrfRkO8a4AU4fP70mfUATA",
  authDomain: "mern-tour-bc817.firebaseapp.com",
  projectId: "mern-tour-bc817",
  storageBucket: "mern-tour-bc817.appspot.com",
  messagingSenderId: "327688303265",
  appId: "1:327688303265:web:decc8a0552a6f749a336e0",
  measurementId: "G-S8E3PYSGES",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://storage.googleapis.com/mern-tour-bc817.appspot.com/user/user-668661aca7ee5f6ae0fe000b-1720082904336.png",
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
