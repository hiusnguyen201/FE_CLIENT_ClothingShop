import { createAsyncThunk } from "@reduxjs/toolkit";
import { getListProductService, getProductService } from "@/redux/product/product.service";
import {
  GetListProductPayload,
  GetListProductResponse,
  GetProductPayload,
  GetProductResponse,
} from "@/redux/product/product.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getProduct = createAsyncThunk<GetProductResponse, GetProductPayload, ThunkApiConfig>(
  "product/get-product",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetProductResponse = await getProductService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getListProduct = createAsyncThunk<GetListProductResponse, GetListProductPayload, ThunkApiConfig>(
  "product/get-products",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListProductResponse = await getListProductService(filters);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);