import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import { createBrowserRouter } from "react-router-dom";
import { VerifyOTPPage } from "@/pages/auth/VerifyOTPPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import CategoryPage from "@/pages/category/CategoryPage";
import SubCategoryPage from "@/pages/subCategory/SubCategoryPage";
import CheckOutPage from "@/pages/checkout/CheckoutPage";
import DetailProduct from "@/pages/shop/ProductDetails/DetailProduct";
import GetOrders from "@/pages/orders/GetOrders";
import LoginPage from "@/pages/auth/LoginPage";
import NotFoundPage from "@/components/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtp from "@/pages/auth/VerifyOtp";

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
      // {
      //   path: "/shop",
      //   element: <ShopPage />,
      // },
      {
        path: "/checkout",
        element: <CheckOutPage />,
      },
      {
        path: "/product/:id",
        element: <DetailProduct />,
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
        element: <VerifyOTPPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
    ],
  },

  {
    path: "/account",
    element: <AccountPage />,
  },
  {
    path: "/get-order/:id",
    element: <GetOrders />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
