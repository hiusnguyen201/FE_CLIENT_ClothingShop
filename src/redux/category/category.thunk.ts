import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesService } from "@/redux/category/category.service";
import { GetCategoriesResponse } from "@/redux/category/category.type";
import { ThunkApiConfig } from "@/types/thunk-api";


export interface SearchCategoriesParams {
  keyword?: string;
  sortBy?: 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const getCategories = createAsyncThunk<GetCategoriesResponse, SearchCategoriesParams, ThunkApiConfig>(
  "categories/get-categories-by-customer",
  async (params, { rejectWithValue }) => {
    try {
      const response: GetCategoriesResponse = await getCategoriesService(params);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);
