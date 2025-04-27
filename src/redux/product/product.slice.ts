import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ProductState, GetProductResponse, GetListProductResponse } from "@/redux/product/product.type";
import { getListProduct, getProduct } from "@/redux/product/product.thunk";

const initialState: ProductState = {
  loading: {
    getProduct: false,
    getListProduct: false,
  },
  product: null,
  list: [],
  totalCount: 0,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearListProduct: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductState>) => {
    builder
      // Get Product
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
      })

      // Get list products
      .addCase(getListProduct.pending, (state: Draft<ProductState>) => {
        state.loading.getListProduct = true;
        state.error = null;
      })
      .addCase(getListProduct.fulfilled, (state: Draft<ProductState>, action: PayloadAction<GetListProductResponse>) => {
        state.loading.getListProduct = false;
        state.error = null;
        state.list = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getListProduct.rejected, (state: Draft<ProductState>, action: PayloadAction<any>) => {
        state.loading.getListProduct = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      });
  },
});

export const { clearListProduct } = productSlice.actions;
export default productSlice.reducer;