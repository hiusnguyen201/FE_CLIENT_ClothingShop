import App from "@/App";
import AuthLayout from "@/layouts/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import CategoryPage from "@/pages/category/CategoryPage";
import HomePage from "@/pages/home/HomePage";
import SearchPage from "@/pages/search/SearchPage";
import SingleProduct from "@/pages/shop/ProductDetails/SingerProduct";
import ShopPage from "@/pages/shop/ShopPage";
import { createBrowserRouter } from "react-router-dom";

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
        path: "/categories/:categoryId",
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
]);

export default router;
