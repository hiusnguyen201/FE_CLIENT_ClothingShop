import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { CreateAddressResponse, AddressState, GetAddressListResponse, SetDefaultOrDeleteAddressResponse, UpdateAddressResponse } from "./address.type";
import { addAddress, deleteAddress, getAddressList, setDefaultAddress, updateAddress } from "./address.thunk";

const initialState: AddressState = {
  loading: {
    addAddress: false,
    getAddressList: false,
    setDefaultAddress: false,
    updateAddress: false,
    deleteAddress: false,
  },
  address: null,
  addressList: [],
  totalCount: 0,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AddressState>) => {
    builder
      // Create address Case
      .addCase(addAddress.pending, (state: Draft<AddressState>) => {
        state.loading.addAddress = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state: Draft<AddressState>, action: PayloadAction<CreateAddressResponse>) => {
        state.loading.addAddress = false;
        state.error = null;
        state.address = action.payload.data;
        state.addressList.push(action.payload.data);
      })
      .addCase(addAddress.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.addAddress = false;
        state.error = action.payload as string;
        state.address = null;
      })

      // Get list address
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

      // Update address
      .addCase(updateAddress.pending, (state: Draft<AddressState>) => {
        state.loading.updateAddress = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state: Draft<AddressState>, action: PayloadAction<UpdateAddressResponse>) => {
        state.loading.updateAddress = false;
        state.error = null;
        const addressUpdated = action.payload.data;

        state.addressList = state.addressList.map((address) => {
          if (address.id === addressUpdated.id) {
            return addressUpdated;
          } else {
            return {
              ...address,
              isDefault: false,
            };
          }
        });
      })
      .addCase(updateAddress.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.updateAddress = false;
        state.error = action.payload as string;
      })

      // Set default address
      .addCase(setDefaultAddress.pending, (state: Draft<AddressState>) => {
        state.loading.setDefaultAddress = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state: Draft<AddressState>, action: PayloadAction<SetDefaultOrDeleteAddressResponse>) => {
        state.loading.setDefaultAddress = false;
        state.error = null;
        const newDefaultId = action.payload.data.id;

        state.addressList = state.addressList.map((address) => ({
          ...address,
          isDefault: address.id === newDefaultId,
        }));
      })
      .addCase(setDefaultAddress.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.setDefaultAddress = false;
        state.error = action.payload as string;
      })

      // Delete address
      .addCase(deleteAddress.pending, (state: Draft<AddressState>) => {
        state.loading.deleteAddress = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state: Draft<AddressState>, action: PayloadAction<SetDefaultOrDeleteAddressResponse>) => {
        state.loading.deleteAddress = false;
        state.error = null;
        const deletedAddressId = action.payload.data.id;

        state.addressList = state.addressList.filter(
          (address) => address.id !== deletedAddressId
        );
      })
      .addCase(deleteAddress.rejected, (state: Draft<AddressState>, action: PayloadAction<any>) => {
        state.loading.deleteAddress = false;
        state.error = action.payload as string;
      })
  }
});

export default addressSlice.reducer;
