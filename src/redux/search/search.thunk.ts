import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { searchProductsService } from "./search.service";
import { SearchProductsResponse } from "./search.type";

export interface SearchProductsParams {
  keyword?: string;
  category?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const searchProducts = createAsyncThunk<
  SearchProductsResponse,
  SearchProductsParams,
  ThunkApiConfig>(
    "product/get-products",
    async (params, { rejectWithValue }) => {
      try {
        const response: SearchProductsResponse = await searchProductsService(params);
        return response;
      } catch (error: any) {
        const message: string = error.response?.data?.message || error.message || error.toString();
        return rejectWithValue(message);
      }
    }
  );