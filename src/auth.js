import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("we have user");
        const uid = user.uid;
        setCurrentUser(user)
        setLoading(false)
      } else {
        setLoading(false)
      }
    });
    }, [])



   return (
     <AuthContext.Provider
      value={{
        currentUser, loading
      }}
      >
      {children}

      </AuthContext.Provider>
   );
 };
