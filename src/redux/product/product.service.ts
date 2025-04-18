import {
  GetProductResponse,
} from "@/redux/product/product.type";
import { apiInstance } from "@/redux/api";

export const getProductService = async (productId: string): Promise<GetProductResponse> => {
  return await apiInstance.get(`/products/get-product-by-id/${productId}`);
};