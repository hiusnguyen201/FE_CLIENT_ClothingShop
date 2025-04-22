import { REGEX_PATTERNS } from "@/types/constant";
import * as Yup from "yup";

export const informationOrderSchema = Yup.object().shape({
  fullName: Yup.string().required("Enter your name"),
  phoneNumber: Yup.string().matches(REGEX_PATTERNS.PHONE_NUMBER.VN, "Invalid phone number").required("Enter your phone number "),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  address: Yup.string().required("Enter your address"),
  province: Yup.string().required("Enter your address"),
  district: Yup.string().required("Enter your district"),
  ward: Yup.string().required("Enter your ward"),
  note: Yup.string(),
});
