import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, GetCategoryResponse, GetListCategoryResponse } from "@/redux/category/category.type";
import { getCategory, getListCategory } from "@/redux/category/category.thunk";

const initialState: CategoriesState = {
  loading: {
    getListCategory: false,
    getCategory: false,
  },
  category: null,
  list: [],
  error: null,
  totalCount: 0,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CategoriesState>) => {
    builder
      // Get list category
      .addCase(getListCategory.pending, (state: Draft<CategoriesState>) => {
        state.loading.getListCategory = true;
        state.error = null;
      })
      .addCase(getListCategory.fulfilled, (state: Draft<CategoriesState>, action: PayloadAction<GetListCategoryResponse>) => {
        state.loading.getListCategory = false;
        state.error = null;
        state.list = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getListCategory.rejected, (state: Draft<CategoriesState>, action: PayloadAction<any>) => {
        state.loading.getListCategory = false;
        state.error = action.payload as string;
        state.list = [];
        state.totalCount = 0;
      })
      // Get category
      .addCase(getCategory.pending, (state: Draft<CategoriesState>) => {
        state.loading.getCategory = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state: Draft<CategoriesState>, action: PayloadAction<GetCategoryResponse>) => {
        state.loading.getCategory = false;
        state.error = null;
        state.category = action.payload.data;
      })
      .addCase(getCategory.rejected, (state: Draft<CategoriesState>, action: PayloadAction<any>) => {
        state.loading.getCategory = false;
        state.error = action.payload as string;
        state.category = null;
      });
  },
});

export default categoriesSlice.reducer;
