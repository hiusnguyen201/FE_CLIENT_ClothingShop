import { Cart } from "@/types/cart";
import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { Address } from "cluster";

/**
 * State
 */
export interface CartState {
  loading: {
    addAddress: boolean;
    getAddress: boolean,
    clearAddress: boolean;
    removeItem: boolean;
  };
  address: Address[];
  error: Nullable<string>;
}

/**
 * Get cart
 */
export interface GetCartResponse extends BaseResponse<Cart[]> { }