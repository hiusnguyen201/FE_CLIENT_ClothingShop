import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "@/routes/router";
import "remixicon/fonts/remixicon.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { store } from "@/redux/store";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>
);
