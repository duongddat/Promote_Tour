var admin = require("firebase-admin");

var serviceAccount = require("../adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://mern-tour-bc817.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
