import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { UpdateAccountUserSchema } from "@/pages/account/schema/updateAccount.schema";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { changePassword } from "@/redux/account/account.thunk";
import { showToast } from "@/utils/toast";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LoadingButton } from "@/components/LoadingButton";
import { InputFormikField } from "@/components/formik-fields";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const UpdateAccountUser = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.account);

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const closeRef = useRef<HTMLButtonElement>(null);

  const togglePassword = (key: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: UpdateAccountUserSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(changePassword({
          password: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmPassword
        })).unwrap();
        closeRef.current?.click();
        showToast(true, "Password changed");
      } catch (error: any) {
        showToast(false, error || "Something went wrong");
      }
    }
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="min-w-36"
          variant="default"
          onClick={() => formik.resetForm()}
        >
          Change password
        </Button>
      </SheetTrigger>
      <SheetContent className="h-screen w-screen md:h-auto md:max-w-md">
        <SheetHeader>
          <SheetTitle>Change password</SheetTitle>
          <SheetDescription>
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex flex-col gap-4 mt-4"
          onSubmit={formik.handleSubmit}
        >
          {/* Current Password */}
          <div className="relative">
            <InputFormikField
              formikProps={formik}
              label="Current password"
              name="currentPassword"
              type={showPassword.current ? "text" : "password"}
              placeholder="Enter your old password"
              required
            />

            {(showPassword.current ? EyeOffIcon : EyeIcon) && React.createElement(
              showPassword.current ? EyeOffIcon : EyeIcon,
              {
                onClick: () => togglePassword("current"),
                className: "absolute cursor-pointer top-7 right-4"
              }
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <InputFormikField
              formikProps={formik}
              label="New password"
              name="newPassword"
              type={showPassword.new ? "text" : "password"}
              placeholder="Enter your new password"
              required
            />

            {(showPassword.new ? EyeOffIcon : EyeIcon) && React.createElement(
              showPassword.new ? EyeOffIcon : EyeIcon,
              {
                onClick: () => togglePassword("new"),
                className: "absolute cursor-pointer top-7 right-4"
              }
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <InputFormikField
              formikProps={formik}
              label="Confirm password"
              name="confirmPassword"
              type={showPassword.confirm ? "text" : "password"}
              placeholder="Enter your confirm password"
              required
            />

            {(showPassword.confirm ? EyeOffIcon : EyeIcon) && React.createElement(
              showPassword.confirm ? EyeOffIcon : EyeIcon,
              {
                onClick: () => togglePassword("confirm"),
                className: "absolute cursor-pointer top-7 right-4"
              }
            )}
          </div>

          <SheetFooter>
            <LoadingButton
              type="submit"
              loading={loading.changePassword} disabled={loading.changePassword}>
              Save
            </LoadingButton>
          </SheetFooter>
        </form>

        <SheetClose asChild>
          <button ref={closeRef} className="hidden" />
        </SheetClose>

      </SheetContent>
    </Sheet>
  );
};

export default UpdateAccountUser;
