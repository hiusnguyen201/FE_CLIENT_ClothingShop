import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesService, getCategoryService } from "@/redux/category/category.service";
import { GetCategoryPayload, GetCategoryResponse, GetListCategoryResponse } from "@/redux/category/category.type";
import { ThunkApiConfig } from "@/types/thunk-api";
import { GetListProductPayload } from "../product/product.type";


export const getListCategory = createAsyncThunk<GetListCategoryResponse, GetListProductPayload, ThunkApiConfig>(
  "categories/get-categories-by-customer",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListCategoryResponse = await getCategoriesService(filters);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getCategory = createAsyncThunk<GetCategoryResponse, GetCategoryPayload, ThunkApiConfig>(
  "categories/get-category-by-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetCategoryResponse = await getCategoryService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);
