import { apiInstance } from "@/redux/api";
import { GetCartResponse } from "./cart.type";

export const addCartService = async (cart: { productVariantId: string; quantity: number }): Promise<GetCartResponse> => {
  return await apiInstance.post("/carts/add-item", cart);
};

export const getCartService = async (): Promise<GetCartResponse> => {
  return await apiInstance.get("/carts/get-cart");
};

export const clearCartService = async (): Promise<GetCartResponse> => {
  return await apiInstance.delete("/carts/clear-cart");
};

export const removeItemService = async (productVariantId: string): Promise<GetCartResponse> => {
  return await apiInstance.delete(`/carts/remove-item/${productVariantId}`);
};
