import { GetCategoriesResponse, GetCategoryResponse } from "@/redux/category/category.type";
import { apiInstance } from "@/redux/api";
import { SearchCategoriesParams } from "./category.thunk";

export const getCategoriesService = async (params: SearchCategoriesParams): Promise<GetCategoriesResponse> => {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, value.toString()])
  ).toString();
  return await apiInstance.get(`/categories/get-categories-by-customer?${queryString}`);
};

export const getCategoryService = async (categoryId: string): Promise<GetCategoryResponse> => {
  return await apiInstance.get(`/categories/get-category-by-customer/${categoryId}`);
};