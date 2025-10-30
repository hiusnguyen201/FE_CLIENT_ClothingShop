// import { useEffect } from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "@/hooks/use-auth";
// import { getHistory, setHistory } from "@/utils/history";

// export const AuthGuard = () => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();

//   if (!isAuthenticated) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   useEffect(() => {
//     const history = getHistory();
//     if (history[history.length - 1]?.url !== location.pathname) {
//       setHistory(location.pathname);
//     }
//   }, [location.pathname]);

//   return <Outlet />;
// };
