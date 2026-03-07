import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: Role[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;