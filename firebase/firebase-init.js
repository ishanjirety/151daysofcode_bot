const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB,
});


const dbFirebase = admin.firestore();
const dbRealtimeDatabase = admin.database();

module.exports = { dbFirebase, dbRealtimeDatabase }