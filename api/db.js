const firebaseApp = require('firebase/app');
const firestore = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

const app = firebaseApp.initializeApp(firebaseConfig);
const db = firestore.getFirestore(app);

module.exports = {
    db: db
};