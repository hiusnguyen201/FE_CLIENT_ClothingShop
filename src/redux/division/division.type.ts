import { District, Province, Ward } from "@/types/division";
import { Nullable } from "@/types/common";
import { GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface DivisionState {
  loading: {
    getProvinces: boolean;
    getDistricts: boolean;
  };
  provinces: Nullable<Province[]>;
  districts: Nullable<District[]>;
  totalCount: number;
  error: Nullable<string>;
}

/**
 * Get provinces
 */
export interface GetProvincesResponse extends GetListResponseData<Province> {}

/**
 * Get districts payload
 */
export type GetDistrictsPayload = {
  provinceCode: number;
};
/**
 * Get districts
 */
export interface GetDistrictsResponse extends GetListResponseData<District> {}

/**
 * Get wards payload
 */
export type GetWardsPayload = {
  districtCode: number;
};
/**
 * Get wards
 */
export interface GetWardsResponse extends GetListResponseData<Ward> {}
