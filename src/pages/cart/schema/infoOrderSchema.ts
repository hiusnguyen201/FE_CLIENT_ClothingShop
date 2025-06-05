import { REGEX_PATTERNS } from "@/types/constant";
import * as Yup from "yup";

export const informationOrderSchema = Yup.object().shape({
  fullName: Yup.string().required("Enter your name"),
  phoneNumber: Yup.string().matches(REGEX_PATTERNS.PHONE_NUMBER.VN, "Invalid phone number").required("Enter your phone number "),
  email: Yup.string().email("Invalid email").required("Enter your email"),
  note: Yup.string(),
  address: Yup.object().shape({
    address: Yup.string().required("Enter your address"),
    provinceName: Yup.string().required(),
    districtName: Yup.string().required(),
    wardName: Yup.string().required()
  }),
});
