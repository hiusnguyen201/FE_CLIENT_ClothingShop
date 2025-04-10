import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";
import { User } from "@/types/user";

/**
 * State
 */
export interface AuthState {
  loading: {
    logout: boolean;
    login: boolean;
    sendOtpViaEmail: boolean;
  };
  user: Nullable<User>;
  isAuthenticated: boolean;
  error: Nullable<string>;
}

/**
 * Logout
 */
export interface LogoutResponse extends BaseResponse<null> {}

/**
 * Login
 */
export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginResponseData {
  isAuthenticated: boolean;
  is2FactorRequired: boolean;
  user: User;
}
export interface LoginResponse extends BaseResponse<LoginResponseData> {}

/**
 * Send OTP Via Email
 */
export type SendOtpViaEmailPayload = {
  email: string;
};
export interface SendOtpViaEmailResponse extends BaseResponse<null> {}

/**
 * Register
 */
export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
};

export interface RegisterResponseData {
  isAuthenticated: boolean;
  is2FactorRequired: boolean;
  user: User;
}

export interface RegisterResponse extends BaseResponse<RegisterResponseData> {}
