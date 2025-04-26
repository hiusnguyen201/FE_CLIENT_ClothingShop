import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DayOfBirth from "@/components/dayOfBirth";
import { UpdateInfoUserSchema } from "./schema/updateInfoUser";

interface UpdateUserInfoProps {
  isOpenUpdateInfo: boolean;
  onClose: () => void;
}

const UpdateInfoUser: FC<UpdateUserInfoProps> = ({ isOpenUpdateInfo, onClose }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      gender: "male",
      birthday: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema: UpdateInfoUserSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <AnimatePresence>
      {isOpenUpdateInfo && (
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
              className="absolute top-4 right-4 text-gray-500 hover:text-black  border border-gray-500"
            >
              <X size={28} />
            </Button>

            <h2 className="text-2xl font-bold mb-6 mt-5">Change your information account</h2>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex-row w-full space-x-6 space-y-4">
                <div className="w-full">
                  <Label htmlFor="fullName" className="text-md text-gray-700 mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    className="border border-gray-400 p-6 rounded-4xl"
                    placeholder="Enter your full name"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                  )}
                </div>

                <div className="w-full space-y-4">
                  <Label>Ngày sinh</Label>
                  <DayOfBirth name="birthday" formik={formik} />
                </div>

                <div className="space-y-4">
                  <Label>Giới tính</Label>
                  <RadioGroup
                    defaultValue={formik.values.gender}
                    className="flex gap-4 mt-2"
                    onValueChange={(val) => formik.setFieldValue("gender", val)}
                  >
                    {["male", "female", "lgbt"].map((val) => (
                      <div key={val} className="flex items-center space-x-2">
                        <RadioGroupItem value={val} id={val} className="" />
                        <Label htmlFor={val}>{val === "male" ? "Nam" : val === "female" ? "Nữ" : "LGBT"}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
                  )}
                </div>
                <div className="w-full">
                  <Label htmlFor="phone" className="text-md text-gray-700 mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    className="border border-gray-400 p-6 rounded-4xl"
                    placeholder="Enter your full name"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>
              </div>
              <Button
                className="inline-flex items-center cursor-pointer justify-center rounded-md text-md font-medium bg-slate-950 text-white shadow hover:bg-slate-800 hover:scale-105 duration-300 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
                type="submit"
              >
                ok
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateInfoUser;
