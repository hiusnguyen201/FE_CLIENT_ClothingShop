import { apiInstance } from "@/redux/api";
import {
  CreateAddressResponse,
  CreateAddressPayload,
  GetAddressListResponse,
  SetDefaultOrDeleteAddressResponse,
  SetDefaultOrDeletePayload,
  UpdateAddressPayload,
  UpdateAddressResponse
} from "./address.type";

export const addAddressService = async (payload: CreateAddressPayload): Promise<CreateAddressResponse> => {
  return await apiInstance.post("/shipping-address/create-shipping-address", payload);
};

export const getAddressListService = async (): Promise<GetAddressListResponse> => {
  return await apiInstance.get("/shipping-address/get-shipping-address");
};

export const setDefaultAddressService = async (payload: SetDefaultOrDeletePayload): Promise<SetDefaultOrDeleteAddressResponse> => {
  return await apiInstance.patch(`/shipping-address/set-default-by-id/${payload.id}`);
};

export const updateAddressService = async (payload: UpdateAddressPayload): Promise<UpdateAddressResponse> => {
  return await apiInstance.put(`/shipping-address/update-shipping-address-by-id/${payload.addressId}`, payload);
};

export const deleteAddressService = async (payload: SetDefaultOrDeletePayload): Promise<SetDefaultOrDeleteAddressResponse> => {
  return await apiInstance.delete(`/shipping-address/remove-shipping-address-by-id/${payload.id}`);
};
