import { GetCategoryPayload, GetCategoryResponse, GetListCategoryPayload, GetListCategoryResponse } from "@/redux/category/category.type";
import { apiInstance } from "@/redux/api";
import { filterObj } from "@/utils/object";

export const getCategoriesService = async (filters: GetListCategoryPayload): Promise<GetListCategoryResponse> => {
  const filteredFilters: Record<string, string> = filterObj(filters);
  return await apiInstance.get(`/categories/get-categories-by-customer?${filteredFilters}`);
};

export const getCategoryService = async (payload: GetCategoryPayload): Promise<GetCategoryResponse> => {
  return await apiInstance.get(`/categories/get-category-by-customer/${payload.id}`);
};