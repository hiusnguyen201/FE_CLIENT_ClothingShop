import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CartState, GetCartResponse } from "./cart.type";
import { addCart } from "./cart.thunk";

const initialState: CartState = {
  loading: {
    getCart: false,
    addCart: false,
    clearCart: false,
    removeItem: false,
  },
  cart: [],
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

  },
  extraReducers: (builder: ActionReducerMapBuilder<CartState>) => {
    builder
      // Get Cart Case
      .addCase(addCart.pending, (state: Draft<CartState>) => {
        state.loading.getCart = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state: Draft<CartState>, action: PayloadAction<GetCartResponse>) => {
        state.loading.getCart = false;
        state.error = null;
        state.cart = action.payload.data;
      })
      .addCase(addCart.rejected, (state: Draft<CartState>, action: PayloadAction<any>) => {
        state.loading.getCart = false;
        state.error = action.payload as string;
        state.cart = [];
      });
  },
});

export default cartSlice.reducer;
