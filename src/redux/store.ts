import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import productReducer from "./product/product.slice";
import categoriesReducer from "./category/category.slice";
import accountReducer from "./account/account.slice";
import addressReducer from "./address/address.slice";
import cartReducer from "./cart/cart.slice";
import divisionReducer from "./division/division.slice";
import orderReducer from "./order/order.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    categories: categoriesReducer,
    account: accountReducer,
    address: addressReducer,
    cart: cartReducer,
    division: divisionReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
