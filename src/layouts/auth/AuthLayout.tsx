import { useAuth } from "@/hooks/use-auth";
import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const { isAuthenticated, is2FactorRequired } = useAuth();

  if (isAuthenticated) {
    if (is2FactorRequired) {
      return <Navigate to="/auth/verify-otp" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900"></div>
        <div className="w-1/4 relative z-20 flex items-center text-lg font-medium">
          <Link to="/">Clothes Men</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <div className="space-y-2">
            <p className="text-lg">Welcome</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
