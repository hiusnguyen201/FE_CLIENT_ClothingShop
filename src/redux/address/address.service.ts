import { apiInstance } from "@/redux/api";
import { AddAddressResponse } from "./address.type";
import { NewAddress } from "@/types/address";

export const addAddressService = async (address: NewAddress): Promise<AddAddressResponse> => {
  return await apiInstance.post("/shipping-address/create-shipping-address", address);
};

// export const getCartService = async (): Promise<GetCartResponse> => {
//   return await apiInstance.get("/address/get-shipping-address");
// };

// export const clearCartService = async (): Promise<GetCartResponse> => {
//   return await apiInstance.delete("/address/clear-cart");
// };

// export const removeItemService = async (productVariantId: string): Promise<GetCartResponse> => {
//   return await apiInstance.delete(`/address/remove-item/${productVariantId}`);
// };
