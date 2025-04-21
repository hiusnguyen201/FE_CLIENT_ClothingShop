import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AddAddressResponse, AddressState } from "./address.type";
import { addAddress } from "./address.thunk";

const initialState: AddressState = {
  loading: {
    addAddress: false,
    getAddressList: false,
    // clearCart: false,
    // removeItem: false,
  },
  address: null,
  addressList: [],
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {

  },
  extraReducers: (builder: ActionReducerMapBuilder<AddressState>) => {
    builder
      // Get Cart Case
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
      });
  },
});

export default addressSlice.reducer;
