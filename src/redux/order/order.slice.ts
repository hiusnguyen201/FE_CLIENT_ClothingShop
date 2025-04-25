import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreateOrderResponse, GetOrderResponse, GetOrdersResponse, OrderState } from "./order.type";
import { createOrder, getOrder, getOrders } from "./order.thunk";

const initialState: OrderState = {
  loading: {
    createOrder: false,
    getOrders: false,
    getOrder: false,
  },
  order: null,
  orders: [],
  totalCount: 0,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {

  },
  extraReducers: (builder: ActionReducerMapBuilder<OrderState>) => {
    builder
      // Create order Case
      .addCase(createOrder.pending, (state: Draft<OrderState>) => {
        state.loading.createOrder = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<CreateOrderResponse>) => {
        state.loading.createOrder = false;
        state.error = null;
        state.order = action.payload.data;
      })
      .addCase(createOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.createOrder = false;
        state.error = action.payload as string;
        state.order = null;
      })

      // Get orders Case
      .addCase(getOrders.pending, (state: Draft<OrderState>) => {
        state.loading.getOrders = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetOrdersResponse>) => {
        state.loading.getOrders = false;
        state.error = null;
        state.orders = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getOrders.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getOrders = false;
        state.error = action.payload as string;
        state.orders = [];
        state.totalCount = 0;
      })

      // Get order Case
      .addCase(getOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getOrder = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetOrderResponse>) => {
        state.loading.getOrder = false;
        state.error = null;
        state.order = action.payload.data;
      })
      .addCase(getOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getOrder = false;
        state.error = action.payload as string;
        state.order = null;
      })
  },
});

export default orderSlice.reducer;
