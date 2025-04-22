import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { AddAddressResponse, GetAddressListResponse, SetDefaultOrRemoveAddressResponse } from "./address.type";
import { NewAddress } from "@/types/address";
import { addAddressService, deleteAddressService, getAddressListService, setDefaultAddressService } from "./address.service";


export const addAddress = createAsyncThunk<AddAddressResponse, NewAddress, ThunkApiConfig>(
  "shipping-address/create-shipping-address",
  async (address, { rejectWithValue }) => {
    try {
      const response: AddAddressResponse = await addAddressService(address);
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

export const setDefaultAddress = createAsyncThunk<SetDefaultOrRemoveAddressResponse, string, ThunkApiConfig>(
  "shipping-address/set-default-by-id",
  async (addressId, { rejectWithValue }) => {
    try {
      const response: SetDefaultOrRemoveAddressResponse = await setDefaultAddressService(addressId);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const deleteAddress = createAsyncThunk<SetDefaultOrRemoveAddressResponse, string, ThunkApiConfig>(
  "shipping-address/remove-shipping-address-by-id",
  async (addressId, { rejectWithValue }) => {
    try {
      const response: SetDefaultOrRemoveAddressResponse = await deleteAddressService(addressId);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);