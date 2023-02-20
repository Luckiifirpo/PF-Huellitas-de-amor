var firebaseAdmin = require("firebase-admin");
var service = JSON.parse(process.env.SERVICE_ACCOUNT)

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(service)
});

module.exports = firebaseAdmin;