import * as Yup from "yup";

export const UpdateInfoUserSchema = Yup.object().shape({
  fullName: Yup.string().required("Vui lòng nhập họ tên"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^((\+84|84|0)(3|5|7|8|9))+([0-9]{8})$/, "Phone number must be a valid Vietnamese phone number"),
  gender: Yup.string().required("Vui lòng chọn giới tính"),
  birthday: Yup.object({
    day: Yup.string().required("Day is required"),
    month: Yup.string().required("Month is required"),
    year: Yup.string().required("Year is required"),
  }).test("is-complete", "Please select complete date", (value) => {
    if (!value) return false;
    const { day, month, year } = value;
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    if (!d || !m || !y) return false;

    const maxDay = new Date(y, m, 0).getDate();
    return d <= maxDay;
  }),
});
