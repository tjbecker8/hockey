import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase"
import { doc, getDoc } from "firebase/firestore";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null)
  const [manager, setManager] = useState(null)

  const getAdmin = async (uid) => {
    const userRef = doc(db, "users", uid)
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data()
      setAdmin(data.admin)
      setManager(data.manager)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setCurrentUser(user)
        getAdmin(uid)
        setLoading(false)

      } else {
        setLoading(false)
      }
    });
    }, [])



   return (
     <AuthContext.Provider
      value={{
        currentUser, loading, admin, manager
      }}
      >
      {children}

      </AuthContext.Provider>
   );
 };
