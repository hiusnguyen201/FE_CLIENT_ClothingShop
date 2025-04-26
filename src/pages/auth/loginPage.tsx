import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import { AuthState, LoginPayload } from "@/redux/auth/auth.type";
import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "./schema/loginSchema";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
      await navigate("/verify-otp");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <div className="flex h-full items-center p-4 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-md text-muted-foreground">Enter your email below to login your account</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full space-y-6">
            {/* email */}
            <div className="w-full">
              <Label htmlFor="email" className="text-md text-gray-700 mb-1">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="border border-gray-400 p-3 rounded-md pr-12"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              )}
            </div>
          </div>
          <div className="w-full space-y-4 mt-3">
            {/* Password */}
            <div className="relative w-full">
              <Label htmlFor="password" className="text-md text-gray-700 mb-1">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="border border-gray-400 p-3 rounded-md pr-12"
                placeholder="Enter your old password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => togglePassword()}
                className="absolute top-8 right-4 text-gray-600 hover:text-black"
              >
                <i className={`ri-${showPassword ? "eye-off" : "eye"}-line text-xl`} />
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
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
