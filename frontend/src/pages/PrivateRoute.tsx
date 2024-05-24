// src/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const cookies = new Cookies();
  const token = cookies.get("access_token");

  if (!token) {
    console.log("Not Token");
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
