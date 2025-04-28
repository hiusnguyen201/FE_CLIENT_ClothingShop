import { ChangePasswordPayload, ChangePasswordResponse, GetProfileResponse, UpdateProfilePayload, UpdateProfileResponse } from "@/redux/account/account.type";
import { apiInstance } from "@/redux/api";

export const getProfileService = async (): Promise<GetProfileResponse> => {
  return await apiInstance.get("/account/view-profile", {
    withCredentials: true,
  });
};

export const updateProfileService = async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
  return await apiInstance.put("/account/update-profile-by-customer", payload, {
    withCredentials: true,
  });
};

export const changePasswordService = async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
  return await apiInstance.put("/account/change-password", payload, {
    withCredentials: true,
  });
};
