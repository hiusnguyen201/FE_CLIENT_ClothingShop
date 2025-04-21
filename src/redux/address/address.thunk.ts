import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { AddAddressResponse } from "./address.type";
import { NewAddress } from "@/types/address";
import { addAddressService } from "./address.service";


export const addAddress = createAsyncThunk<AddAddressResponse, NewAddress, ThunkApiConfig>(
  "address/create-shipping-address",
  async (address, { rejectWithValue }) => {
    try {
      const response: AddAddressResponse = await addAddressService(address);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
)

// export const getCart = createAsyncThunk<GetCartResponse, void, ThunkApiConfig>(
//   "carts/get-cart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response: GetCartResponse = await getCartService();
//       return response;
//     } catch (error: any) {
//       const message: string = error.response?.data?.message || error.message || error.toString();
//       return rejectWithValue(message);
//     }
//   }
// );

// export const clearCart = createAsyncThunk<GetCartResponse, void, ThunkApiConfig>(
//   "carts/clear-cart",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response: GetCartResponse = await clearCartService();
//       return response;
//     } catch (error: any) {
//       const message: string = error.response?.data?.message || error.message || error.toString();
//       return rejectWithValue(message);
//     }
//   }
// );

// export const removeItem = createAsyncThunk<GetCartResponse, string, ThunkApiConfig>(
//   "carts/remove-item",
//   async (productVariantId: string, { rejectWithValue }) => {
//     try {
//       const response: GetCartResponse = await removeItemService(productVariantId);
//       return response;
//     } catch (error: any) {
//       const message: string = error.response?.data?.message || error.message || error.toString();
//       return rejectWithValue(message);
//     }
//   }
// );