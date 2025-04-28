import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AccountState, GetProfileResponse, UpdateProfileResponse } from "@/redux/account/account.type";
import { getProfile, updateProfile } from "@/redux/account/account.thunk";

const initialState: AccountState = {
  loading: {
    getProfile: false,
    updateProfile: false
  },
  user: null,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AccountState>) => {
    builder
      // Get Profile Case
      .addCase(getProfile.pending, (state: Draft<AccountState>) => {
        state.loading.getProfile = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state: Draft<AccountState>, action: PayloadAction<GetProfileResponse>) => {
        state.loading.getProfile = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.getProfile = false;
        state.error = action.payload as string;
        state.user = null;
      })
      // Update Profile Case
      .addCase(updateProfile.pending, (state: Draft<AccountState>) => {
        state.loading.updateProfile = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state: Draft<AccountState>, action: PayloadAction<UpdateProfileResponse>) => {
        state.loading.updateProfile = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(updateProfile.rejected, (state: Draft<AccountState>, action: PayloadAction<any>) => {
        state.loading.updateProfile = false;
        state.error = action.payload as string;
        state.user = null;
      });
  },
});

export default accountSlice.reducer;
