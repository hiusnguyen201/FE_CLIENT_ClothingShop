import { Nullable } from "@/types/common";
import {
  BaseResponse,
  GetListResponseData,
} from "@/types/response";
import { Order } from "@/types/order";

/**
 * State
 */
export interface OrderState {
  loading: {
    createOrder: boolean;
    getOrders: boolean;
  };
  order: Nullable<Order>;
  orders: Order[],
  totalCount: number;
  error: Nullable<string>;
}


/**
 * Create order
 */

export interface NewOrderPayload {
  customerId: string;
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

export interface GetOrdersResponse extends GetListResponseData<Order> { }
