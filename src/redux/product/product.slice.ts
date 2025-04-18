import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, GetProductResponse } from "@/redux/product/product.type";
import { getProduct } from "@/redux/product/product.thunk";

const initialState: ProductState = {
  loading: {
    getProduct: false,
  },
  product: null,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder
      // Get Product Case
      .addCase(getProduct.pending, (state: Draft<ProductState>) => {
        state.loading.getProduct = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state: Draft<ProductState>, action: PayloadAction<GetProductResponse>) => {
        state.loading.getProduct = false;
        state.error = null;
        state.product = action.payload.data;
      })
      .addCase(getProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.getProduct = false;
        state.error = action.payload as string;
        state.product = null;
      });
  },
});

export default productSlice.reducer;
