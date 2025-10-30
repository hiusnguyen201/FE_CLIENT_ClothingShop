import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, is2FactorRequired } = useAuth();

  if (!isAuthenticated) {
    if (is2FactorRequired) {
      return <Navigate to="/auth/verify-otp" replace />;
    }

    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
