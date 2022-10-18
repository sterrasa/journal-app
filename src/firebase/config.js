// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDt000mLegK6HWDWGnqSfj1Ggx7ICXaX88",
    authDomain: "journal-app-57d3c.firebaseapp.com",
    projectId: "journal-app-57d3c",
    storageBucket: "journal-app-57d3c.appspot.com",
    messagingSenderId: "425700582691",
    appId: "1:425700582691:web:671e64015888944774d896",
    measurementId: "G-3TGMEZS24Z"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);