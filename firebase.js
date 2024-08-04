// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlqOczR62XVTm3Re1h21Bxqya2jrn0r4E",
  authDomain: "inventory-d8185.firebaseapp.com",
  projectId: "inventory-d8185",
  storageBucket: "inventory-d8185.appspot.com",
  messagingSenderId: "999128615775",
  appId: "1:999128615775:web:661fac2abc6cadbd03c4ea",
  measurementId: "G-D8F9DXD0PB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
