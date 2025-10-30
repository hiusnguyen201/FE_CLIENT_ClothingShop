import { Address } from "@/types/division";
import { Nullable } from "@/types/common";
import {
  BaseResponse,
  GetListResponseData
} from "@/types/response";

/**
 * State
 */
export interface AddressState {
  loading: {
    addAddress: boolean;
    getAddressList: boolean,
    setDefaultAddress: boolean,
    updateAddress: boolean,
    deleteAddress: boolean,
  };
  address: Nullable<Address>;
  addressList: Address[];
  error: Nullable<string>;
  totalCount: number;
}

/**
 * Create address
 */

export interface CreateAddressPayload {
  address: string;
  provinceId: string;
  districtId: string;
  wardCode: string;
  isDefault: boolean;
}
export interface CreateAddressResponse extends BaseResponse<Address> { }

/**
 * Update address
 */

export interface UpdateAddressPayload {
  addressId: string;
  address: string;
  provinceId: string;
  districtId: string;
  wardCode: string;
  isDefault: boolean;
}
export interface UpdateAddressResponse extends BaseResponse<Address> { }

/**
 * Get address list
 */
export interface GetAddressListResponse extends GetListResponseData<Address> { }

/**
 * Set default / remove address 
 */
export interface SetDefaultOrDeletePayload {
  id: string;
}
export interface SetDefaultOrDeleteAddressResponse extends BaseResponse<{ id: string }> { }