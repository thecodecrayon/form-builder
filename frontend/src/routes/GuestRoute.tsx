// src/routes/GuestRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface GuestRouteProps {
  children: JSX.Element;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/fillform" replace />;
  }

  return children;
};

export default GuestRoute;
