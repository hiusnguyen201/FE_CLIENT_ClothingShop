import { apiInstance } from "@/redux/api";
import {
  LoginPayload,
  LoginResponse,
  LogoutResponse,
  RegisterPayload,
  RegisterResponse,
  SendOtpViaEmailPayload,
  SendOtpViaEmailResponse,
} from "@/redux/auth/auth.type";

export const logoutService = async (): Promise<LogoutResponse> => {
  return await apiInstance.post("/auth/logout");
};

export const loginService = async (payload: LoginPayload): Promise<LoginResponse> => {
  return await apiInstance.post("/auth/login", payload);
};

export const sendOtpViaEmailService = async (payload: SendOtpViaEmailPayload): Promise<SendOtpViaEmailResponse> => {
  return await apiInstance.post("/auth/send-otp-via-email", payload);
};

export const registerService = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  return await apiInstance.post("/auth/register", payload);
};
