import { apiInstance } from "@/redux/api";
import { GetDistrictsPayload, GetDistrictsResponse, GetProvincesResponse, GetWardsPayload, GetWardsResponse } from "./division.type";

export const getProvincesService = async (): Promise<GetProvincesResponse> => {
  return await apiInstance.get("/divisions/get-provinces");
};

export const getDistrictsService = async (payload: GetDistrictsPayload): Promise<GetDistrictsResponse> => {
  return await apiInstance.get(`/divisions/get-districts-by-province-code/${payload.provinceCode}`);
};

export const getWardsService = async (payload: GetWardsPayload): Promise<GetWardsResponse> => {
  return await apiInstance.get(`/divisions/get-wards-by-district-code/${payload.districtCode}`);
};