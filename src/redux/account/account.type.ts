import { Nullable } from "@/types/common";
import { Gender } from "@/types/constant";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

/**
 * State
 */
export interface AccountState {
  loading: {
    getProfile: boolean;
    updateProfile: boolean;
  };
  user: Nullable<User>;
  error: Nullable<string>;
}

/**
 * Get Profile
 */
export interface GetProfileResponse extends BaseResponse<User> { }

/**
 * Upadte Profile
 */
export type UpdateProfilePayload = {
  name: string,
  phone: string,
  gender: Gender
}

export interface UpdateProfileResponse extends BaseResponse<User> { }

/**
 * Change password
 */
export type ChangePasswordPayload = {
  password: string,
  newPassword: string,
  confirmNewPassword: string
}

export interface ChangePasswordResponse extends BaseResponse<User> { }