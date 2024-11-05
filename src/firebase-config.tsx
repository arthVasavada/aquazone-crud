/* This code snippet is setting up a connection to Firebase Firestore in a TypeScript React project.
Here's a breakdown of what each part is doing: */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:process.env.APIkey,
  authDomain: "aquazone-crud.firebaseapp.com",
  projectId: "aquazone-crud",
  storageBucket: "aquazone-crud.firebasestorage.app",
  messagingSenderId: "1031980814992",
  appId: "1:1031980814992:web:133765ee8c5c7e9371be15",
  measurementId: "G-HWWPN7M337",
}; /* The `firebaseConfig` constant is an object that contains configuration settings required to connect
your TypeScript React project to Firebase Firestore. Each key in the object corresponds to a
specific configuration option: */

const app =
  initializeApp(
    firebaseConfig
  ); /*initializes a connection to Firebase using the
configuration settings provided in the `firebaseConfig` object. This step sets up the Firebase app
with the specified configuration.*/

export const db = getFirestore(app);
