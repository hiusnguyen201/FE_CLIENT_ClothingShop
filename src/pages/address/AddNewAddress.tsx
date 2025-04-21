import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SelectAddressDropdown from "@/components/SelectAddressDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { AddNewAddressSchema } from "./schema/selectAddressSchema";

interface AddNewAddressProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewAddress: FC<AddNewAddressProps> = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
      provinces: "",
      districts: "",
      wards: "",
      default: false,
    },
    validationSchema: AddNewAddressSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-md transition-opacity z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-white z-50 shadow-lg p-6 rounded-l-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <Button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
              <X size={28} />
            </Button>

            <h2 className="text-2xl font-bold mb-6 mt-2">Địa chỉ của tôi</h2>

            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex w-full space-x-6">
                <div className="w-1/2 lg:w-2/3">
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

                <div className="w-1/2 lg:w-1/3">
                  <Label htmlFor="phoneNumber" className="text-md text-gray-700 mb-1">
                    Phone number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    className="border border-gray-400 p-6 rounded-4xl"
                    placeholder="Enter your phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                  )}
                </div>
              </div>

              <SelectAddressDropdown formik={formik} />

              <div className="flex items-center space-x-2">
                <Input type="checkbox" id="default" className="w-4 h-4" />
                <Label htmlFor="default" className="text-sm font-medium"
                  onClick={() => formik.setFieldValue("default", !formik.values.default)}
                >
                  Set as default
                </Label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <Button type="button" onClick={onClose} className="px-6 py-2 rounded-lg bg-gray-200 text-black">
                  Cancel
                </Button>
                <Button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Add
                </Button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddNewAddress;
