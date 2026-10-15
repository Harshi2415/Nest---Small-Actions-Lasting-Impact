import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const loggedIn = localStorage.getItem("nest_logged_in") === "true";

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}