import React, { useEffect, useState, createContext } from 'react';
import "firebase/firestore"
import 'firebase/auth';
import '@firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        const uid = user.uid;
        console.log("auth state good!");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

  }, [])

   return (
     <AuthContext.Provider
      value={{
        currentUser
      }}
      >
      {children}
      </AuthContext.Provider>
   )
 }
