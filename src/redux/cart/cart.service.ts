import { apiInstance } from "@/redux/api";
import { AddCartPayload, AddCartResponse, ClearCartResponse, GetCartResponse, RemoveItemPayload, RemoveItemResponse } from "./cart.type";

export const addCartService = async (payload: AddCartPayload): Promise<AddCartResponse> => {
  return await apiInstance.post("/carts/add-item", payload);
};

export const getCartService = async (): Promise<GetCartResponse> => {
  return await apiInstance.get("/carts/get-cart");
};

export const clearCartService = async (): Promise<ClearCartResponse> => {
  return await apiInstance.delete("/carts/clear-cart");
};

export const removeItemService = async (payload: RemoveItemPayload): Promise<RemoveItemResponse> => {
  return await apiInstance.delete(`/carts/remove-item/${payload.productVariantId}`);
};
