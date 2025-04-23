import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import { createBrowserRouter } from "react-router-dom";
import UserInfo from "@/pages/account/UserInfoPage";
// import CollectionPage from "@/pages/collection/CollectionPage";
import { VerifyOTPPage } from "@/pages/auth/VerifyOTPPage";
import { LoginPage } from "@/pages/auth/loginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import SingleProduct from "@/pages/shop/ProductDetails/SingerProduct";
import ShopPage from "@/pages/shop/ShopPage";
import CollectionPage from "@/pages/collection/CollectionPage";

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
        path: "/collection/:collectionName",
        element: <CollectionPage />,
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
      {
        path: "verify-otp",
        element: <VerifyOTPPage />
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
