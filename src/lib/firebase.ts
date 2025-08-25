
// Import the functions you need from the SDKs you need
import {initializeApp, getApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "apiKey": "YOUR_API_KEY_HERE", // Replace with your actual API key
  "projectId": "techfest-website-by-nanites",
  "appId": "1:370163727149:web:c928febd162d6b3e4df1a4",
  "storageBucket": "techfest-website-by-nanites.firebasestorage.app",
  "authDomain": "techfest-website-by-nanites.firebaseapp.com",
  "messagingSenderId": "370163727149"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};
