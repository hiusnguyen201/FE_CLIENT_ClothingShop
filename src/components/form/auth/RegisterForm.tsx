import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { InputFormikField } from "@/components/formik-fields";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthState, RegisterPayload } from "@/redux/auth/auth.type";
import { GENDER, REGEX_PATTERNS } from "@/types/constant";
import { register } from "@/redux/auth/auth.thunk";
import { SelectFormikField } from "@/components/formik-fields/SelectFormikField";

const initialValues: RegisterPayload = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: GENDER.MALE,
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  phone: Yup.string().required("Phone is required").matches(REGEX_PATTERNS.PHONE_NUMBER.VN, "Invalid phone number"),
  password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  gender: Yup.string().oneOf(Object.values(GENDER), "Invalid gender").required("Gender is required"),
});

export function RegisterForm({ className }: { className?: string }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<AuthState>((selector) => selector.auth);

  const handleSubmit = async (values: RegisterPayload) => {
    try {
      await dispatch(register(values)).unwrap();
      toast({ title: "Registration successful!" });
    } catch (err: any) {
      toast({ variant: "destructive", title: err.message });
    }
  };

  const formik: FormikProps<RegisterPayload> = useFormik({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={cn("grid gap-6", className)}>
      <InputFormikField label="Name" name="name" type="text" required formikProps={formik} />
      <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />
      <InputFormikField label="Phone" name="phone" type="text" required formikProps={formik} />
      <InputFormikField label="Password" name="password" type="password" required formikProps={formik} />
      <InputFormikField label="Confirm Password" name="confirmPassword" type="password" required formikProps={formik} />
      <SelectFormikField
        label="Gender"
        name="gender"
        options={[
          { value: GENDER.MALE, label: "Male" },
          { value: GENDER.FEMALE, label: "Female" },
          { value: GENDER.OTHER, label: "Other" },
        ]}
        required
        formikProps={formik}
      />
      <LoadingButton loading={loading.login} disabled={loading.login}>
        Register
      </LoadingButton>
    </form>
  );
}