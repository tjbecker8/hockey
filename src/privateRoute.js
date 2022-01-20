import React, { useContext, useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  console.log("useruser", currentUser, loading);
      return currentUser ? children : <Navigate to="/login" />;
}





export default PrivateRoute
