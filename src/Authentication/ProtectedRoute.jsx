import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  
  if (loading) {
    return <div>Loading...</div>; 
  }
  
  if (!user.email) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
