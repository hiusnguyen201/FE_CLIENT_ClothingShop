import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(6, "New password must be at least 6 characters").required("Please enter new password"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirmation password does not match")
    .required("Please confirm password"),
});
