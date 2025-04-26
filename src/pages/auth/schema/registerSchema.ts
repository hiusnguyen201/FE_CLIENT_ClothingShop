import * as Yup from "yup";

export const registerSchema = Yup.object({
  name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),

  email: Yup.string().required("Email is required").email("Please enter a valid email"),

  password: Yup.string().min(6, "New password must be at least 6 characters").required("Please enter new password"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^((\+84|84|0)(3|5|7|8|9))+([0-9]{8})$/, "Phone number must be a valid Vietnamese phone number"),
});
