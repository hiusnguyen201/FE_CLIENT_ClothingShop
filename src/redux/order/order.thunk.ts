import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "@/types/thunk-api";
import { CreateOrderResponse, GetListOrderPayload, GetListOrderResponse, GetOrderPayload, GetOrderResponse, NewOrderPayload } from "./order.type";
import { createOrderService, getListOrderService, getOrderService } from "./order.service";


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

export const getListOrder = createAsyncThunk<GetListOrderResponse, GetListOrderPayload, ThunkApiConfig>(
  "orders/get-orders-by-customer",
  async (filters, { rejectWithValue }) => {
    try {
      const response: GetListOrderResponse = await getListOrderService(filters);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const getOrder = createAsyncThunk<GetOrderResponse, GetOrderPayload, ThunkApiConfig>(
  "orders/get-order-by-customer",
  async (payload, { rejectWithValue }) => {
    try {
      const response: GetOrderResponse = await getOrderService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);