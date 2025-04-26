import { Nullable, Optional } from "@/types/common";
import {
  BaseResponse,
  GetListParams,
  GetListResponseData,
} from "@/types/response";
import { Order } from "@/types/order";

/**
 * State
 */
export interface OrderState {
  loading: {
    createOrder: boolean;
    getListOrder: boolean;
    getOrder: boolean;
  };
  order: Nullable<Order>;
  list: Order[],
  totalCount: number;
  error: Nullable<string>;
}


/**
 * Create order
*/

export interface NewOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  provinceCode: number;
  districtCode: number;
  wardCode: string;
  address: string;
  productVariants: {
    id: string,
    quantity: number
  }[];
  paymentMethod: string;
  notes: string;
}

export interface CreateOrderResponse extends BaseResponse<Order> { }

/**
 * Get list order
*/
type OrderFieldsSort = Extract<"createdAt", Order>;
export interface GetListOrderPayload extends GetListParams<Order> {
  sortBy: Optional<Nullable<OrderFieldsSort>>;
}
export interface GetListOrderResponse extends GetListResponseData<Order> { }


/**
 * Get Order
 */
export interface GetOrderPayload {
  id: string;
}
export interface GetOrderResponse extends BaseResponse<Order> { }
