import * as Yup from "yup";

export const AddressSchema = Yup.object().shape({
  address: Yup.string().required("Enter your address"),
  provinceId: Yup.string().required("Select your province"),
  districtId: Yup.string().required("Select your district"),
  wardCode: Yup.string().required("Select your ward"),
  isDefault: Yup.bool(),
});
