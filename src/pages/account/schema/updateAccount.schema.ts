import * as Yup from "yup";

export const UpdateAccountUserSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Please enter current password"),

  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .notOneOf([Yup.ref("currentPassword")], "The new password cannot be the same as the current password.")
    .required("Please enter new password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Confirmation password does not match")
    .required("Please confirm password"),
});
