// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx9AOLSvBeACuBbV9Vrt0BDgSbKgsiQO0",
  authDomain: "chara-812dc.firebaseapp.com",
  projectId: "chara-812dc",
  storageBucket: "chara-812dc.appspot.com",
  messagingSenderId: "810582313875",
  appId: "1:810582313875:web:615613819bfa5a133af666"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;