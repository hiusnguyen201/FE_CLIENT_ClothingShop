import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { CreateOrderResponse, GetOrdersResponse, NewOrderPayload } from "./order.type";
import { createOrderService, getOrdersService } from "./order.service";


export const createOrder = createAsyncThunk<CreateOrderResponse, NewOrderPayload, ThunkApiConfig>(
  "orders/create-order-by-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: CreateOrderResponse = await createOrderService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getOrders = createAsyncThunk<GetOrdersResponse, void, ThunkApiConfig>(
  "orders/get-orders-by-customer",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetOrdersResponse = await getOrdersService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);