// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxMfa-LKq50xI911VBThZN4kaZiZtOVJg",
  authDomain: "peliculas-app-eafa0.firebaseapp.com",
  projectId: "peliculas-app-eafa0",
  storageBucket: "peliculas-app-eafa0.appspot.com",
  messagingSenderId: "1056950965831",
  appId: "1:1056950965831:web:ef79b957c641ef66fb4362",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
