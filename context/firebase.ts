import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA8UZO05zc6oOSuOjGzFQZKhr4Q6vqRHmg",
    authDomain: "stockpile-grants.firebaseapp.com",
    projectId: "stockpile-grants",
    storageBucket: "stockpile-grants.appspot.com",
    messagingSenderId: "200831904161",
    appId: "1:200831904161:web:43ffc2019b46d8f78a43e0"
  
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
