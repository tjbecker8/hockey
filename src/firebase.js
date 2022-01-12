import { initializeApp } from 'firebase/app';

import "firebase/auth";
import { getFirestore } from "firebase/firestore"




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
// const analytics = getAnalytics(app);
// export const auth = app.auth();
// export const db = app.firestore();

// export const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// export const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     const user = res.user;
//     await db.collection("users").add({
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
//
//  export const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
//
//
// export const logout = () => {
//   auth.signOut();
// };
