import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(uid)
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
