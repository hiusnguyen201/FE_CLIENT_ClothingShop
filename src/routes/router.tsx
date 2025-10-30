import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import { createBrowserRouter } from "react-router-dom";
import { VerifyOTPPage } from "@/pages/auth/VerifyOTPPage";
import CategoryPage from "@/pages/category/CategoryPage";
import ProductDetail from "@/pages/shop/ProductDetails/ProductDetail";
import NotFoundPage from "@/components/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { LoginPage } from "@/pages/auth/loginPage";
import OrderDetailPage from "@/pages/orders/OrderDetailPage";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/checkout/CheckoutPage";
import CheckoutPageResult from "@/pages/checkout/CheckoutPageResult";
import { ProtectedRoute } from "@/layouts/auth/ProtectedRoute";

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
        path: "/category/:slug",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/account",
            element: <AccountPage />,
          },
          {
            path: "/cart",
            element: <CartPage />,
          },
          {
            path: "/checkout/success",
            element: <CheckoutPage />,
          },
          {
            path: "/get-order/:id",
            element: <OrderDetailPage />,
          },
        ],
      },
      {
        path: "/checkout/result",
        element: <CheckoutPageResult />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
]);

export default router;
