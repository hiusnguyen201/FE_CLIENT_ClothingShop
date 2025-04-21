import * as Yup from "yup";

const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;

export const AddNewAddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Enter your name"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number").required("Enter your phone number "),
  default: Yup.bool().required(),
  address: Yup.string().required("Enter your address"),
  provinces: Yup.string().required("Select your province"),
  districts: Yup.string().required("Select your districts"),
  wards: Yup.string().required("Select your wards"),
});
