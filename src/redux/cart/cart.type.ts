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
    // removeItem: boolean;
  };
  cart: Cart[];
  error: Nullable<string>;
}

/**
 * Get cart
 */
export interface GetCartResponse extends BaseResponse<Cart[]> { }

/**
 * Add cart
 */
export type AddCartPayload = {
  productVariantId: string;
  quantity: number;
};

export interface AddCartResponse extends BaseResponse<Cart> { }

/**
 * Remove item
 */
export type RemoveItemPayload = {
  productVariantId: string;
};

export interface RemoveItemResponse extends BaseResponse<{ customerId: string, productVariantId: string }> { }

/**
 * Clear cart
 */
export interface ClearCartResponse extends BaseResponse<{ customerId: string }> { }
