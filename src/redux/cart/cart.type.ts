import { Cart } from "@/types/cart";
import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";

/**
 * State
 */
export interface CartState {
  loading: {
    getCart: boolean,
    addCart: boolean;
    clearCart: boolean;
    removeItem: boolean;
  };
  cart: Cart[];
  error: Nullable<string>;
}

/**
 * Get cart
 */
export interface GetCartResponse extends BaseResponse<Cart[]> { }