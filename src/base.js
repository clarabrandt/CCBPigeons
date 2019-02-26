import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey:process.env.REACT_APP_FIREBASE_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL:process.env.REACT_APP_FIREBASE_DATABASE,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage().ref();
// db.settings({
//     timestampsInSnapshots: true
// });

export { db, storage };
