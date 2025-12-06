import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGnFipG5HBnPBccQbomd58uwkCNWlZVSg",
  authDomain: "cafekiosk-5809d.firebaseapp.com",
  projectId: "cafekiosk-5809d",
  storageBucket: "cafekiosk-5809d.firebasestorage.app",
  messagingSenderId: "485873330344",
  appId: "1:485873330344:web:79d6f63db9e43f3c54ba9d",
  measurementId: "G-RPHQJK5LDK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
