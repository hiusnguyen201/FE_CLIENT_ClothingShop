import {
  GetListProductPayload,
  GetListProductResponse,
  GetProductPayload,
  GetProductResponse,
} from "@/redux/product/product.type";
import { apiInstance } from "@/redux/api";
import { filterObj } from "@/utils/object";

export const getProductService = async (payload: GetProductPayload): Promise<GetProductResponse> => {
  return await apiInstance.get(`/products/get-product-by-customer/${payload.id}`);
};

export const getListProductService = async (filters: GetListProductPayload): Promise<GetListProductResponse> => {
  const filteredFilters: Record<string, string> = filterObj(filters);

  return await apiInstance.get(`/products/get-products-by-customer?${new URLSearchParams(filteredFilters)}`);
};