import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { CreateAddressResponse, CreateAddressPayload, GetAddressListResponse, SetDefaultOrDeleteAddressResponse, SetDefaultOrDeletePayload } from "./address.type";
import { addAddressService, deleteAddressService, getAddressListService, setDefaultAddressService } from "./address.service";


export const addAddress = createAsyncThunk<CreateAddressResponse, CreateAddressPayload, ThunkApiConfig>(
  "shipping-address/create-shipping-address",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateAddressResponse = await addAddressService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
)

export const getAddressList = createAsyncThunk<GetAddressListResponse, void, ThunkApiConfig>(
  "shipping-address/get-shipping-address",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetAddressListResponse = await getAddressListService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const setDefaultAddress = createAsyncThunk<SetDefaultOrDeleteAddressResponse, SetDefaultOrDeletePayload, ThunkApiConfig>(
  "shipping-address/set-default-by-id",
  async (payload, { rejectWithValue }) => {
    try {
      const response: SetDefaultOrDeleteAddressResponse = await setDefaultAddressService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteAddress = createAsyncThunk<SetDefaultOrDeleteAddressResponse, SetDefaultOrDeletePayload, ThunkApiConfig>(
  "shipping-address/remove-shipping-address-by-id",
  async (payload, { rejectWithValue }) => {
    try {
      const response: SetDefaultOrDeleteAddressResponse = await deleteAddressService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);