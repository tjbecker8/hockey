import React, { useContext, } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./auth";



const ManagerRoute = ({ children }) => {
  const { manager, admin } = useContext(AuthContext);

      return manager || admin ? children : <Navigate to="/" />;
}





export default ManagerRoute
