import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBCddJLsBD5Mb9IT06QXei9MPpf1PiRCg0",
    authDomain: "finteens-8a55f.firebaseapp.com",
    projectId: "finteens-8a55f",
    storageBucket: "finteens-8a55f.firebasestorage.app",
    messagingSenderId: "387897789634",
    appId: "1:387897789634:web:d6c4d8ee498256da72bf5b",
    measurementId: "G-L8YNEY2ZST"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
