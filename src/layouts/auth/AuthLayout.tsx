import React from "react";
import { Outlet } from "react-router-dom";
import SideBarAuth from "./components/SideBarAuth";

const AuthLayout = () => {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <SideBarAuth />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
