import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { JSX } from "react";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // o un loader si querés

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};
