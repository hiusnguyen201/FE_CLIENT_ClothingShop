import { Product } from "@/types/product";
import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";

/**
 * State
 */
export interface ProductState {
  loading: {
    getProduct: boolean;
  };
  product: Nullable<Product>;
  error: Nullable<string>;
}

/**
 * Get Product
 */
export interface GetProductResponse extends BaseResponse<Product> { }