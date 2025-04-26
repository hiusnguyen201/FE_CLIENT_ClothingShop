import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreateOrderResponse, GetListOrderResponse, GetOrderResponse, OrderState } from "./order.type";
import { createOrder, getListOrder, getOrder } from "./order.thunk";

const initialState: OrderState = {
  loading: {
    createOrder: false,
    getListOrder: false,
    getOrder: false,
  },
  order: null,
  list: [],
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

      // Get list order Case
      .addCase(getListOrder.pending, (state: Draft<OrderState>) => {
        state.loading.getListOrder = true;
        state.error = null;
      })
      .addCase(getListOrder.fulfilled, (state: Draft<OrderState>, action: PayloadAction<GetListOrderResponse>) => {
        state.loading.getListOrder = false;
        state.error = null;
        state.list = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getListOrder.rejected, (state: Draft<OrderState>, action: PayloadAction<any>) => {
        state.loading.getListOrder = false;
        state.error = action.payload as string;
        state.list = [];
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
