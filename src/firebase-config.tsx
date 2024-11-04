import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBBrK0x9tvNJENr-m3MMzsa83k_H2FLxIo",
  authDomain: "aquazone-crud.firebaseapp.com",
  projectId: "aquazone-crud",
  storageBucket: "aquazone-crud.firebasestorage.app",
  messagingSenderId: "1031980814992",
  appId: "1:1031980814992:web:133765ee8c5c7e9371be15",
  measurementId: "G-HWWPN7M337",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
