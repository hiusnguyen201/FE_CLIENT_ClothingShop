import { createAsyncThunk } from "@reduxjs/toolkit";
import { changePasswordService, getProfileService, updateProfileService } from "@/redux/account/account.service";
import { ChangePasswordPayload, ChangePasswordResponse, GetProfileResponse, UpdateProfilePayload, UpdateProfileResponse } from "@/redux/account/account.type";
import { ThunkApiConfig } from "@/types/thunk-api";

export const getProfile = createAsyncThunk<GetProfileResponse, void, ThunkApiConfig>(
  "account/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const response: GetProfileResponse = await getProfileService();
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk<UpdateProfileResponse, UpdateProfilePayload, ThunkApiConfig>(
  "account/update-profile",
  async (payload, { rejectWithValue }) => {
    try {
      const response: UpdateProfileResponse = await updateProfileService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);

export const changePassword = createAsyncThunk<ChangePasswordResponse, ChangePasswordPayload, ThunkApiConfig>(
  "account/change-password",
  async (payload, { rejectWithValue }) => {
    try {
      const response: ChangePasswordResponse = await changePasswordService(payload);
      return response;
    } catch (error: any) {
      const message: string = error.response?.data?.message || error.message || error.toString();
      return rejectWithValue(message);
    }
  }
);