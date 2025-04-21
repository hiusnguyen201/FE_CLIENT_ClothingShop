import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import productReducer from "./product/product.slice";
import searchProductsReducer from "./search/search.slice";
import categoriesReducer from "./category/category.slice";
import accountReducer from "./account/account.slice";
import addressReducer from "./address/address.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    searchProducts: searchProductsReducer,
    categories: categoriesReducer,
    account: accountReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
