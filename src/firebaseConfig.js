// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Vos configurations Firebase (remplacez par les vôtres)
const firebaseConfig = {
    apiKey: "AIzaSyC7bao15Ku5ptcQKyOR77zlDAm-aozPYbE",
    authDomain: "julie-19e6b.firebaseapp.com",
    projectId: "julie-19e6b",
    storageBucket: "julie-19e6b.appspot.com",
    messagingSenderId: "88063473341",
    appId: "1:88063473341:web:3ca0718cd8a625dbcda9d4",
    measurementId: "G-6CW312WEP0"
  };

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
