import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // While checking auth status, don't render anything yet
  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If authenticated, render the child route. Otherwise, redirect to login.
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;