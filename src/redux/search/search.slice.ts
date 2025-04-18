import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { SearchProductsResponse, SearchProductsState } from "./search.type";
import { searchProducts } from "./search.thunk";

const initialState: SearchProductsState = {
  loading: { searchProducts: false },
  products: [],
  error: null,
  totalCount: 0,
  page: 1,
  limit: 10,
};

const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    clearProduct(state) {
      state.products = [];
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SearchProductsState>) => {
    builder
      .addCase(searchProducts.pending, (state: Draft<SearchProductsState>) => {
        state.loading.searchProducts = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state: Draft<SearchProductsState>, action: PayloadAction<SearchProductsResponse>) => {
        state.loading.searchProducts = false;
        state.error = null;
        state.products = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(searchProducts.rejected, (state: Draft<SearchProductsState>, action: PayloadAction<any>) => {
        state.loading.searchProducts = false;
        state.error = action.payload as string;
        state.products = [];
        state.totalCount = 0;
      });
  },
});

export const { setPage, setLimit, clearProduct } = searchProductsSlice.actions;
export default searchProductsSlice.reducer;
