import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormikHelpers, FormikProps, useFormik } from "formik";
import { AuthState, LoginPayload } from "@/redux/auth/auth.type";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Loader } from "lucide-react";
import { loginSchema } from "@/pages/auth/schema/loginSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialValues: LoginPayload = {
  email: "customer123@gmail.com",
  password: "1234",
};

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { loading, user, isAuthenticated, error } = useAppSelector<AuthState>((selector) => selector.auth);
  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", title: error });
    }
  }, [error]);

  const handleSubmit = async (values: LoginPayload, { resetForm }: FormikHelpers<LoginPayload>) => {
    if (!login) return;
    await login(values);
    if (!isAuthenticated || !user) return;

    resetForm({});

    if (user.verifiedAt) {
      toast({ title: "Login successful" });
      await navigate("/");
    } else {
      // dispatch(sendOtpViaEmail({ email: user.email }));
      await navigate("/verify-otp");
    }
  };

  const formik: FormikProps<LoginPayload> = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-md text-muted-foreground">Enter your email below to login your account</p>
        </div>
        {/* {errorMessage && (
          <p className="text-white p-3 text-sm text-muted-foreground bg-red-500 rounded">{errorMessage}</p>
        )} */}
        <form onSubmit={formik.handleSubmit}>
          <Label htmlFor="email" className="text-md text-gray-700 mb-1">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldTouched("email", true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={
              formik.errors.email && formik.touched.email
                ? "border-red-500 border-2"
                : "focus-visible:ring-1 border border-gray-800"
            }
          />

          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm text-muted-foreground">{formik.errors.email}</p>
          )}

          <div className="relative my-3">
            <Label htmlFor="password" className="text-md text-gray-700 mb-1">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched("passoword", true);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={
                formik.errors.password && formik.touched.password
                  ? "border-red-500 border-2"
                  : "focus-visible:ring-1 border border-gray-800"
              }
            />

            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm text-muted-foreground">{formik.errors.password}</p>
            )}

            {/* <button
              className="absolute right-3 top-10 cursor-pointer text-xl"
              type="button"
              // onClick={toggleShowPassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button> */}
          </div>
          <Link
            to="/auth/forgot-password"
            className="flex py-3 opacity-70 hover:opacity-100 text-md text-muted-foreground text__underline"
          >
            Forgot password?
          </Link>

          <Button
            className="inline-flex items-center cursor-pointer justify-center rounded-md text-md font-medium bg-slate-950 text-white shadow hover:bg-slate-800 hover:scale-105 duration-300 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
          >
            {loading.login ? <Loader className="w-6 h-6 animate-spin" /> : "Login"}
          </Button>
        </form>
        <span className="px-8 text-center text-md text-muted-foreground opacity-75">
          Don't have an account?&nbsp;
          <Link to="/auth/register" className="text__underline hover:text-slate-950 ">
            Sign up.
          </Link>
        </span>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground text-md">Or continue with</span>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-white text-md border py-2 w-full rounded-md mt-2 flex justify-center items-center text-md hover:scale-105 duration-300 font-medium"
        >
          <svg className="mr-3" viewBox="0 0 48 48" width="25px">
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Login with Google
        </Button>
        <span className="px-8 text-center text-md text-muted-foreground">
          By clicking continue, you agree to our&nbsp;
          <Link to="/auth/terms-of-service" className="text__underline hover:text-primary">
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link to="/auth/privacy-policy" className="text__underline hover:text-primary">
            Privacy Policy
          </Link>
          .
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
