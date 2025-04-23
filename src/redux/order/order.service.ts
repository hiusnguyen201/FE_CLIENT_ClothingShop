import { apiInstance } from "@/redux/api";
import { CreateOrderResponse, GetOrdersResponse, NewOrderPayload } from "./order.type";

export const createOrderService = async (payload: NewOrderPayload): Promise<CreateOrderResponse> => {
  return await apiInstance.post("/orders/create-order-by-customer", payload,
    { withCredentials: true }
  );
};

export const getOrdersService = async (): Promise<GetOrdersResponse> => {
  return await apiInstance.get("/orders/get-orders-by-customer", {
    withCredentials: true,
  });
};