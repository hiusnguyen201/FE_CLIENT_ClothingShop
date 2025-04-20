import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, GetCategoriesResponse, GetCategoryResponse } from "@/redux/category/category.type";
import { getCategories, getCategory } from "@/redux/category/category.thunk";

const initialState: CategoriesState = {
  loading: {
    getCategories: false,
    getCategory: false,
  },
  category: null,
  categories: [],
  error: null,
  totalCount: 0,
  page: 1,
  limit: 10,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<CategoriesState>) => {
    builder
      // Get categpries Case
      .addCase(getCategories.pending, (state: Draft<CategoriesState>) => {
        state.loading.getCategories = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state: Draft<CategoriesState>, action: PayloadAction<GetCategoriesResponse>) => {
        state.loading.getCategories = false;
        state.error = null;
        state.categories = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getCategories.rejected, (state: Draft<CategoriesState>, action: PayloadAction<any>) => {
        state.loading.getCategories = false;
        state.error = action.payload as string;
        state.categories = [];
        state.totalCount = 0;
      })
      // Get category Case
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
