
var admin = require("firebase-admin");

var serviceAccount = require("./react-firebase-demo-88c79-firebase-adminsdk-dvari-52a2c16ef4.json");

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.auth().setCustomUserClaims(uid, { admin: true })
    .then(() => {
        console.log('Custom claims set for user', uid);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });
