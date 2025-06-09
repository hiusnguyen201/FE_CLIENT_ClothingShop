import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import AccountPage from "@/pages/account/AccountPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import { createBrowserRouter } from "react-router-dom";
import { VerifyOTPPage } from "@/pages/auth/VerifyOTPPage";
import CategoryPage from "@/pages/category/CategoryPage";
import DetailProduct from "@/pages/shop/ProductDetails/DetailProduct";
import NotFoundPage from "@/components/NotFoundPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
import VerifyOtp from "@/pages/auth/VerifyOtp";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { LoginPage } from "@/pages/auth/loginPage";
import OrderDetailPage from "@/pages/orders/OrderDetailPage";
import CartPage from "@/pages/cart/CartPage";
import CheckOutPage from "@/pages/checkout/CheckoutPage";
import { AuthGuard } from "@/guards/AuthGuard";

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
        element: <DetailProduct />,
      },
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/get-order/:id",
            element: <OrderDetailPage />,
          },
          {
            path: "/account/:id",
            element: <AccountPage />,
          },
          {
            path: "/cart",
            element: <CartPage />
          },
          {
            path: "/checkout",
            element: <CheckOutPage />,
          },
        ],
      }
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
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
