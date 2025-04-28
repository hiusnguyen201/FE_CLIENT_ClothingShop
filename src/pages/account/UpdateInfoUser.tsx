import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UpdateInfoUserSchema } from "./schema/updateInfoUser";
import BirthdaySelect from "@/components/DayOfBirth";
import { updateProfile } from "@/redux/account/account.thunk";
import { useAppDispatch } from "@/redux/store";
import { Gender } from "@/types/constant";
import { showToast } from "@/utils/toast";

interface UpdateUserInfoProps {
  isOpenUpdateInfo: boolean;
  onClose: () => void;
}

const UpdateInfoUser: FC<UpdateUserInfoProps> = ({ isOpenUpdateInfo, onClose }) => {
  const dispatch = useAppDispatch();

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
    onSubmit: async (values) => {
      try {
        await dispatch(updateProfile({
          name: values.fullName,
          gender: values.gender as Gender,
          phone: values.phone
        })).unwrap();
        showToast(true, "Updated");
        onClose();
      } catch (error) {
        if (error) showToast(false, "Error");
      }
    }
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

            <form className="" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col w-full gap-4">
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

                <div className="w-full">
                  <Label>Day of birth</Label>
                  <BirthdaySelect name="birthday" formik={formik} />
                </div>

                <div className="">
                  <Label>Gender</Label>
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
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    className="border border-gray-400 p-6 rounded-4xl"
                    placeholder="Enter your phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                  )}
                </div>
                <Button
                  className="inline-flex items-center cursor-pointer justify-center rounded-md text-md font-medium bg-slate-950 text-white shadow hover:bg-slate-800 hover:scale-105 duration-300 h-9 px-4 py-2 ml-auto w-full disabled:opacity-75"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UpdateInfoUser;
