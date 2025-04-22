import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { AddCartPayload, AddCartResponse, ClearCartResponse, GetCartResponse, RemoveItemPayload, RemoveItemResponse } from "./cart.type";
import { addCartService, clearCartService, getCartService, removeItemService } from "./cart.service";


export const addCart = createAsyncThunk<AddCartResponse, AddCartPayload, ThunkApiConfig>(
  "carts/add-item",
  async (payload, { rejectWithValue }) => {
    try {
      const response: AddCartResponse = await addCartService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getCart = createAsyncThunk<GetCartResponse, void, ThunkApiConfig>(
  "carts/get-cart",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetCartResponse = await getCartService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const clearCart = createAsyncThunk<ClearCartResponse, void, ThunkApiConfig>(
  "carts/clear-cart",
  async (_, { rejectWithValue }) => {
    try {
      const response: ClearCartResponse = await clearCartService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const removeItem = createAsyncThunk<RemoveItemResponse, RemoveItemPayload, ThunkApiConfig>(
  "carts/remove-item",
  async (payload, { rejectWithValue }) => {
    try {
      const response: RemoveItemResponse = await removeItemService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);