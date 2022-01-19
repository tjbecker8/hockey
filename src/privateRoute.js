import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"

const PrivateRoute = ({ children }) => {
  const user = false


      return user ? children : <Navigate to="/login" />;




  // console.log("...", user);
  // return auth.currentUser ? children : <Navigate to="/login" />;
}

// const PrivateRoute = ({ children }) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       return children;
//     } else {
//       <Navigate to={"/login"} />
//     }
//   });
// }


export default PrivateRoute
