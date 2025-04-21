import { Address } from "@/types/address";
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
    // clearAddress: boolean;
    // removeItem: boolean;
  };
  address: Nullable<Address>;
  addressList: Address[];
  error: Nullable<string>;
}

/**
 * Add address
 */
export interface AddAddressResponse extends BaseResponse<Address> { }

export interface getListAddressResponse extends GetListResponseData<Address[]> { }