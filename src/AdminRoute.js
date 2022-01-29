import React, { useContext, } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./auth";



const AdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);

      return admin ? children : <Navigate to="/" />;
}





export default AdminRoute
