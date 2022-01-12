import { initializeApp } from 'firebase/app';

import "firebase/auth";
import "firebase/firestore"


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
// const analytics = getAnalytics(app);
const auth = app.auth();
const db = app.firestore();

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


const logout = () => {
  auth.signOut();
};

export default {
  auth,
  db,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};
