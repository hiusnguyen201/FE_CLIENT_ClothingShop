import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import { createBrowserRouter } from "react-router-dom";
import UserInfo from "@/pages/account/UserInfoPage";
import CategoryPage from "@/pages/category/CategoryPage";
import SubCategoryPage from "@/pages/subCategory/SubCategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/category/:categoryName/:subCategoryName",
        element: <SubCategoryPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/account",
    element: <AccountPage />,
    children: [
      {
        path: "info",
        element: <UserInfo />,
      },
      {
        path: "orders",
        element: "",
      },
      {
        path: "voucher-wallet",
        element: "",
      },
      {
        path: "user-address",
        element: "",
      },
    ],
  },
]);

export default router;
