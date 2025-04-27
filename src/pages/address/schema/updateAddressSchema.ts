import * as Yup from "yup";

const phoneRegExp = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
export const UpdateAddressSchema = Yup.object().shape({
  fullName: Yup.string(),
  phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number"),
  address: Yup.string(),
  provinces: Yup.string(),
  districts: Yup.string(),
  wards: Yup.string(),
});
