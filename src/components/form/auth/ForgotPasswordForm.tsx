import * as Yup from "yup";
import { useFormik, FormikProps } from "formik";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/LoadingButton";
import { InputFormikField } from "@/components/formik-fields";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { AuthState, ForgotPasswordPayload } from "@/redux/auth/auth.type";
import { useTimer } from "@/hooks/use-timer";
import { forgotPassword } from "@/redux/auth/auth.thunk";
import { showToast } from "@/utils/toast";

const initialValues: ForgotPasswordPayload = {
  email: "",
  callbackUrl: "",
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Please enter a valid email"),
});

export function ForgotPasswordForm({ className }: { className?: string }) {
  const { setEndTime } = useTimer();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector<AuthState>((selector) => selector.auth);
  const handleSubmit = async (values: ForgotPasswordPayload) => {
    try {
      // if (getRemainingSeconds()) {
      //   showToast(false, "Please wait");
      //   return
      // }

      dispatch(
        forgotPassword({
          email: values.email,
          callbackUrl: "http://localhost:5173/auth/reset-password",
        })
      );
      setEndTime(60);
      formik.resetForm();
      showToast(true, "Check email to recovery account");
    } catch (err: any) {
      showToast(false, err || "Something went wrong");
    }
  };

  const formik: FormikProps<ForgotPasswordPayload> = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={cn("grid gap-6", className)}>
      <InputFormikField label="Email" name="email" type="email" required formikProps={formik} />

      <LoadingButton loading={loading.forgotPassword} disabled={loading.forgotPassword}>
        Reset password
      </LoadingButton>
    </form>
  );
}
