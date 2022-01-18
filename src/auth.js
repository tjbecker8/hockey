import React, { useEffect, useState } from 'react';
import { database } from './App';
import firebase from 'firebase';
import "firebase/firestore"
import 'firebase/auth';
import '@firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        const uid = user.uid;
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
