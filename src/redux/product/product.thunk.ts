import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductService } from "@/redux/product/product.service";
import {
  GetProductResponse,
} from "@/redux/product/product.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getProduct = createAsyncThunk<GetProductResponse, string, ThunkApiConfig>(
  "product/get-product",
  async (productId, { rejectWithValue }) => {
    try {
      const response: GetProductResponse = await getProductService(productId);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);