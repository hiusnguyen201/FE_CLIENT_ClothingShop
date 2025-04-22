import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CartState, GetCartResponse } from "./cart.type";
import { addCart, clearCart, getCart } from "./cart.thunk";

const initialState: CartState = {
  loading: {
    getCart: false,
    addCart: false,
    clearCart: false,
    // removeItem: false,
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
      // Add Cart Case
      .addCase(addCart.pending, (state: Draft<CartState>) => {
        state.loading.addCart = true;
        state.error = null;
      })
      .addCase(addCart.fulfilled, (state: Draft<CartState>) => {
        state.loading.addCart = false;
        state.error = null;
        // state.cart = action.payload.data;
      })
      .addCase(addCart.rejected, (state: Draft<CartState>, action: PayloadAction<any>) => {
        state.loading.addCart = false;
        state.error = action.payload as string;
      })

      // Get Cart Case
      .addCase(getCart.pending, (state: Draft<CartState>) => {
        state.loading.addCart = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state: Draft<CartState>, action: PayloadAction<GetCartResponse>) => {
        state.loading.addCart = false;
        state.error = null;
        state.cart = action.payload.data;
      })
      .addCase(getCart.rejected, (state: Draft<CartState>, action: PayloadAction<any>) => {
        state.loading.addCart = false;
        state.error = action.payload as string;
        state.cart = [];
      })

      // Clear Cart Case
      .addCase(clearCart.pending, (state: Draft<CartState>) => {
        state.loading.clearCart = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state: Draft<CartState>) => {
        state.loading.clearCart = false;
        state.error = null;
        state.cart = [];
      })
      .addCase(clearCart.rejected, (state: Draft<CartState>, action: PayloadAction<any>) => {
        state.loading.clearCart = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
