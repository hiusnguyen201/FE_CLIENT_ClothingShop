import { useRef } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { verifyOtpSchema } from "./schema/verifyOtp";
import { Input } from "@/components/ui/input";

interface VerifyOtpFormValues {
  otp: string;
  email: string;
  type: string;
}

const VerifyOtp = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik<VerifyOtpFormValues>({
    initialValues: {
      otp: "",
      email: "",
      type: "",
    },
    validationSchema: verifyOtpSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (value: string, index: number) => {
    const currentOtp = formik.values.otp.split("");
    currentOtp[index] = value;
    formik.setFieldValue("otp", currentOtp.join(""));
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !formik.values.otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter the OTP sent to your email</p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex space-x-2 px-2 pb-3">
            {[...Array(6)].map((_, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-lg border rounded focus:outline-none border-gray-200"
                value={formik.values.otp[index] || ""}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {formik.errors.otp && <p className="text-red-500 text-sm text-muted-foreground">{formik.errors.otp}</p>}

          <Button
            className="bg-gray-900 hover:scale-105 text-white inline-flex items-center justify-center rounded-md text-md font-medium shadow h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
          >
            Send
          </Button>
        </form>

        <span className="px-8 text-center text-sm text-muted-foreground">
          Back to Login Page?&nbsp;
          <Link to="/auth/login" className="text__underline hover:text-gray-500">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default VerifyOtp;
