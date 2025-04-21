import * as Yup from "yup";


export const AddNewAddressSchema = Yup.object().shape({
  address: Yup.string().required("Enter your address"),
  provinceCode: Yup.string().required("Select your province"),
  districtCode: Yup.string().required("Select your districts"),
  wardCode: Yup.string().required("Select your wards"),
  isDefault: Yup.bool(),
});
