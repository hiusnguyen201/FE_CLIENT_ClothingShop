import { ActionReducerMapBuilder, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginResponse, RegisterResponse, SendOtpViaEmailResponse, VerifyOtpResponse } from "@/redux/auth/auth.type";
import { login, register, logout, sendOtpViaEmail, verifyOtp } from "@/redux/auth/auth.thunk";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: {
    logout: false,
    login: false,
    register: false,
    sendOtpViaEmail: false,
    verifyOtp: false,
  },
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    // Logout
    builder
      .addCase(logout.pending, (state: Draft<AuthState>) => {
        state.loading.logout = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state: Draft<AuthState>) => {
        state.loading.logout = false;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.logout = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Login
    builder
      .addCase(login.pending, (state: Draft<AuthState>) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: Draft<AuthState>, action: PayloadAction<LoginResponse>) => {
        console.log(action.payload);
        const { data } = action.payload;
        state.loading.login = false;
        state.isAuthenticated = true;
        state.user = data.user;
        state.error = null;
      })
      .addCase(login.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.login = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Register
    builder
      .addCase(register.pending, (state: Draft<AuthState>) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state: Draft<AuthState>, action: PayloadAction<RegisterResponse>) => {
        const { data } = action.payload;
        state.loading.register = false;
        state.isAuthenticated = false;
        state.user = data.user;
        state.error = null;
      })
      .addCase(register.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.register = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      });

    // Send OTP via email
    builder
      .addCase(sendOtpViaEmail.pending, (state: Draft<AuthState>) => {
        state.loading.sendOtpViaEmail = true;
        state.error = null;
      })
      .addCase(sendOtpViaEmail.fulfilled, (state: Draft<AuthState>, _: PayloadAction<SendOtpViaEmailResponse>) => {
        state.loading.sendOtpViaEmail = false;
        state.error = null;
      })
      .addCase(sendOtpViaEmail.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.sendOtpViaEmail = false;
        state.error = action.payload as string;
      });

    // VerifyOTP
    builder
      .addCase(verifyOtp.pending, (state: Draft<AuthState>) => {
        state.loading.verifyOtp = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state: Draft<AuthState>, action: PayloadAction<VerifyOtpResponse>) => {
        const { data } = action.payload;
        state.loading.verifyOtp = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = data.user;
      })
      .addCase(verifyOtp.rejected, (state: Draft<AuthState>, action: PayloadAction<any>) => {
        state.loading.verifyOtp = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
