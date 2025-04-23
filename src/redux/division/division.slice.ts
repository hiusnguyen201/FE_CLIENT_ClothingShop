import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { DivisionState, GetDistrictsResponse, GetProvincesResponse } from "./division.type";
import { getProvinces } from "./division.thunk";

const initialState: DivisionState = {
  loading: {
    getProvinces: false,
    getDistricts: false,
  },
  provinces: [],
  districts: [],
  totalCount: 0,
  error: null,
};

const divisionSlice = createSlice({
  name: "division",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<DivisionState>) => {
    builder
      // Get provinces Case
      .addCase(getProvinces.pending, (state: Draft<DivisionState>) => {
        state.loading.getProvinces = true;
        state.error = null;
      })
      .addCase(getProvinces.fulfilled, (state: Draft<DivisionState>, action: PayloadAction<GetProvincesResponse>) => {
        state.loading.getProvinces = false;
        state.error = null;
        state.provinces = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getProvinces.rejected, (state: Draft<DivisionState>, action: PayloadAction<any>) => {
        state.loading.getProvinces = false;
        state.error = action.payload as string;
        state.provinces = [];
        state.totalCount = 0;
      });

    // Get districts Case
    // .addCase(getDistricts.pending, (state: Draft<DivisionState>) => {
    //   state.loading.getDistricts = true;
    //   state.error = null;
    // })
    // .addCase(getDistricts.fulfilled, (state: Draft<DivisionState>, action: PayloadAction<GetDistrictsResponse>) => {
    //   state.loading.getDistricts = false;
    //   state.error = null;
    //   state.districts = action.payload.data.list;
    //   state.totalCount = action.payload.data.totalCount;
    // })
    // .addCase(getDistricts.rejected, (state: Draft<DivisionState>, action: PayloadAction<any>) => {
    //   state.loading.getDistricts = false;
    //   state.error = action.payload as string;
    //   state.districts = [];
    //   state.totalCount = 0;
    // })
  },
});

export default divisionSlice.reducer;
