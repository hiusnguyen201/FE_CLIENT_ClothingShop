import { apiInstance } from "@/redux/api";
import { CreateOrderResponse, GetListOrderPayload, GetListOrderResponse, GetOrderPayload, GetOrderResponse, NewOrderPayload } from "./order.type";
import { filterObj } from "@/utils/object";

export const createOrderService = async (payload: NewOrderPayload): Promise<CreateOrderResponse> => {
  return await apiInstance.post("/orders/create-order-by-customer", payload,
    { withCredentials: true }
  );
};

export const getListOrderService = async (filters: GetListOrderPayload): Promise<GetListOrderResponse> => {
  const filteredFilters: Record<string, string> = filterObj(filters);
  return await apiInstance.get(`/orders/get-orders-by-customer?${new URLSearchParams(filteredFilters)}`, {
    withCredentials: true,
  });
};

export const getOrderService = async (payload: GetOrderPayload): Promise<GetOrderResponse> => {
  return await apiInstance.get(`orders/get-order-by-customer/${payload.id}`, {
    withCredentials: true,
  });
};