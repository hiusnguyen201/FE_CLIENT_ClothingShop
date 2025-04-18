import {
  SearchProductsResponse
} from "@/redux/search/search.type";
import { apiInstance } from "@/redux/api";
import { SearchProductsParams } from "./search.thunk";

export const searchProductsService = async (params: SearchProductsParams): Promise<SearchProductsResponse> => {
  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, value.toString()])
  ).toString();
  return await apiInstance.get(`/products/get-products-by-customer?${queryString}`);
};