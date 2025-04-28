import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { UpdateAccountUserSchema } from "@/pages/account/schema/updateAccount.schema";
import { useAppDispatch } from "@/redux/store";
import { changePassword } from "@/redux/account/account.thunk";
import { showToast } from "@/utils/toast";

interface UpdateAccountUserProps {
  isOpenUpdateAccount: boolean;
  onClose: () => void;
}

const UpdateAccountUser: FC<UpdateAccountUserProps> = ({ isOpenUpdateAccount, onClose }) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

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
        showToast(true, "Password changed");
        onClose();
      } catch (error) {
        if (error) showToast(false, "Error");
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpenUpdateAccount && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-md transition-opacity z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-lg p-6 rounded-l-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black border border-gray-500"
            >
              <X size={28} />
            </Button>

            <h2 className="text-2xl font-bold mb-6 mt-2">Change your password</h2>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="w-full space-y-4">
                {/* Current Password */}
                <div className="relative w-full">
                  <Label htmlFor="currentPassword" className="text-md text-gray-700 mb-1">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    className="border border-gray-400 p-6 rounded-4xl pr-12"
                    placeholder="Enter your old password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("current")}
                    className="absolute top-10 right-4 text-gray-600 hover:text-black"
                  >
                    <i className={`ri-${showPassword.current ? "eye-off" : "eye"}-line text-xl`} />
                  </button>
                  {formik.touched.currentPassword && formik.errors.currentPassword && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.currentPassword}</div>
                  )}
                </div>

                {/* New Password */}
                <div className="relative w-full">
                  <Label htmlFor="newPassword" className="text-md text-gray-700 mb-1">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    className="border border-gray-400 p-6 rounded-4xl pr-12"
                    placeholder="Enter your new password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("new")}
                    className="absolute top-10 right-4 text-gray-600 hover:text-black"
                  >
                    <i className={`ri-${showPassword.new ? "eye-off" : "eye"}-line text-xl`} />
                  </button>
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</div>
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
                    className="border border-gray-400 p-6 rounded-4xl pr-12"
                    placeholder="Confirm your new password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("confirm")}
                    className="absolute top-10 right-4 text-gray-600 hover:text-black"
                  >
                    <i className={`ri-${showPassword.confirm ? "eye-off" : "eye"}-line text-xl`} />
                  </button>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full rounded-2xl p-6 text-lg border border-gray-500 hover:bg-gray-100"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateAccountUser;
