import React from "react";
import { Navigate } from "react-router-dom";

export default function CollaboratorProtected({ children }) {
  const token = localStorage.getItem("collabToken");

  if (!token) {
    return <Navigate to="/collaborator-login" />;
  }

  return children;
}
