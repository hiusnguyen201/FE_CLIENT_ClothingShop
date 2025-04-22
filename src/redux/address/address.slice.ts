import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AddAddressResponse, AddressState, GetAddressListResponse } from "./address.type";
import { addAddress, getAddressList } from "./address.thunk";

const initialState: AddressState = {
  loading: {
    addAddress: false,
    getAddressList: false,
    // clearCart: false,
    // removeItem: false,
  },
  address: null,
  addressList: [],
  totalCount: 0,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {

  },
  extraReducers: (builder: ActionReducerMapBuilder<AddressState>) => {
    builder
      // Create address Case
      .addCase(addAddress.pending, (state: Draft<AddressState>) => {
        state.loading.addAddress = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state: Draft<AddressState>, action: PayloadAction<AddAddressResponse>) => {
        state.loading.addAddress = false;
        state.error = null;
        state.address = action.payload.data;
      })
      .addCase(addAddress.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.addAddress = false;
        state.error = action.payload as string;
        state.address = null;
      })

      // Get address Case
      .addCase(getAddressList.pending, (state: Draft<AddressState>) => {
        state.loading.getAddressList = true;
        state.error = null;
      })
      .addCase(getAddressList.fulfilled, (state: Draft<AddressState>, action: PayloadAction<GetAddressListResponse>) => {
        state.loading.getAddressList = false;
        state.error = null;
        state.addressList = action.payload.data.list;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getAddressList.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.getAddressList = false;
        state.error = action.payload as string;
        state.addressList = [];
        state.totalCount = 0;
      })
  },
});

export default addressSlice.reducer;
