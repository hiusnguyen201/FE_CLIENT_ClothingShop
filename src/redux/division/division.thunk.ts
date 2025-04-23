import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { GetDistrictsPayload, GetDistrictsResponse, GetProvincesResponse, GetWardsPayload, GetWardsResponse } from "./division.type";
import { getDistrictsService, getProvincesService, getWardsService } from "./division.service";


export const getProvinces = createAsyncThunk<GetProvincesResponse, void, ThunkApiConfig>(
  "divisions/get-provinces",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetProvincesResponse = await getProvincesService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getDistricts = createAsyncThunk<GetDistrictsResponse, GetDistrictsPayload, ThunkApiConfig>(
  "divisions/get-districts-by-province-code",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetDistrictsResponse = await getDistrictsService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getWards = createAsyncThunk<GetWardsResponse, GetWardsPayload, ThunkApiConfig>(
  "divisions/get-wards-by-district-code",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetWardsResponse = await getWardsService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);