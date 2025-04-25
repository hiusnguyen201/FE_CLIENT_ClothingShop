import { Product } from "@/types/product";
import { Nullable, Optional } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface ProductState {
  loading: {
    getProduct: boolean;
    getListProduct: boolean;
  };
  product: Nullable<Product>;
  list: Product[];
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get Product
 */
export interface GetProductPayload {
  id: string;
}
export interface GetProductResponse extends BaseResponse<Product> { }

/**
 * Get list Product
 */
type ProductFieldsSort = Extract<"name" | "createdAt", Product>;
export interface GetListProductPayload extends GetListParams<Product> {
  category?: Optional<string>;
  sortBy: Optional<Nullable<ProductFieldsSort>>;
}
export interface GetListProductResponse extends GetListResponseData<Product> { }
