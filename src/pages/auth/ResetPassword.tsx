import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPasswordSchema } from "./schema/resetPassword";

const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });

  const togglePassword = (key: "password" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="w-full space-y-4 mt-3">
            {/* Password */}
            <div className="relative w-full">
              <Label htmlFor="password" className="text-md text-gray-700 mb-1">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword.password ? "text" : "password"}
                className="border border-gray-400 p-5 rounded-md pr-12"
                placeholder="Confirm your new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => togglePassword("password")}
                className="absolute top-9 right-4 text-gray-600 hover:text-black"
              >
                <i className={`ri-${showPassword.password ? "eye-off" : "eye"}-line text-xl`} />
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              )}
            </div>
            {/* Confirm Password */}
            <div className="relative w-full">
              <Label htmlFor="confirmPassword" className="text-md text-gray-700 mb-1">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                className="border border-gray-400 p-5 rounded-md pr-12"
                placeholder="Confirm your new password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => togglePassword("confirm")}
                className="absolute top-9 right-4 text-gray-600 hover:text-black"
              >
                <i className={`ri-${showPassword.confirm ? "eye-off" : "eye"}-line text-xl`} />
              </button>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
              )}
            </div>
          </div>
          <Button
            className="inline-flex items-center cursor-pointer justify-center rounded-md text-md font-medium bg-slate-950 text-white shadow hover:bg-slate-800 hover:scale-105 duration-300 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
            type="submit"
          >
            Login
          </Button>
        </form>
        <span className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?&nbsp;
          <Link to="/auth/login" className="underline underline-offset-4 hover:text-primary">
            Login.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
