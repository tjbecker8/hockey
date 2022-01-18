import { initializeApp } from 'firebase/app';

import "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";






const firebaseConfig = {
  apiKey: "AIzaSyDWYF8kuUeoqxqmX8KWUw2Xod5oAvnslmU",
  authDomain: "refsched-7a9be.firebaseapp.com",
  projectId: "refsched-7a9be",
  storageBucket: "refsched-7a9be.appspot.com",
  messagingSenderId: "133470001004",
  appId: "1:133470001004:web:1678bfb31b207c9be4c549",
  measurementId: "G-S7PZWCVFJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage(app, "gs://refsched-7a9be.appspot.com");



export const auth = getAuth();
export const user = auth.currentUser;
