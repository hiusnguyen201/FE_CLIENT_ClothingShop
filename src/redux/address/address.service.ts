import { apiInstance } from "@/redux/api";
import { AddAddressResponse, GetAddressListResponse, SetDefaultOrRemoveAddressResponse } from "./address.type";
import { NewAddress } from "@/types/address";

export const addAddressService = async (address: NewAddress): Promise<AddAddressResponse> => {
  return await apiInstance.post("/shipping-address/create-shipping-address", address);
};

export const getAddressListService = async (): Promise<GetAddressListResponse> => {
  return await apiInstance.get("/shipping-address/get-shipping-address");
};

export const setDefaultAddressService = async (addressId: string): Promise<SetDefaultOrRemoveAddressResponse> => {
  return await apiInstance.patch(`/shipping-address/set-default-by-id/${addressId}`);
};

export const deleteAddressService = async (addressId: string): Promise<SetDefaultOrRemoveAddressResponse> => {
  return await apiInstance.delete(`/shipping-address/remove-shipping-address-by-id/${addressId}`);
};
