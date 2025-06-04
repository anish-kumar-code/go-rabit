const admin = require("firebase-admin");
const serviceAccount = require("./firebaseCredentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin; // Export 'admin' instead of 'firebase'
