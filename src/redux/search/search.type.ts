import { Product } from "@/types/product";
import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";

/**
 * State
 */
export interface SearchProductsState {
  loading: {
    searchProducts: boolean;
  };
  products: Product[];
  error: Nullable<string>;
  totalCount: number;
  page: number;
  limit: number;
}

/**
 * Search Products
 */
export interface SearchProductsResponse extends BaseResponse<{ totalCount: number; list: Product[] }> { }
