import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CategoriesState, GetCategoriesResponse } from "@/redux/category/category.type";
import { getCategories } from "@/redux/category/category.thunk";

const initialState: CategoriesState = {
  loading: {
    getCategories: false,
  },
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
      // Get Categoget Case
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
      });
  },
});

export default categoriesSlice.reducer;
