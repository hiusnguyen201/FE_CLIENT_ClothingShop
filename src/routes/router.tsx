import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import CategoryPage from "@/pages/category/CategoryPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import SingleProduct from "@/pages/shop/productDetails/SingerProduct";
import ShopPage from "@/pages/shop/ShopPage";
import { createBrowserRouter } from "react-router-dom";
import UserInfo from "@/pages/account/UserInfoPage";

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
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
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
