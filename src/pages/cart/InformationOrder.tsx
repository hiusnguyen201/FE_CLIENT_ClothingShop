import React from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentMethodCart from "@/pages/cart/PaymentMethodCart";
import { informationOrderSchema } from "@/pages/cart/schema/infoOrderSchema";
import SelectAddressDropdown from "@/components/SelectAddressDropdown";

const InformationOrder: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      note: "",
      saveToAddressBook: false,
    },
    validationSchema: informationOrderSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <form className="px-5 lg:ml-15" onSubmit={formik.handleSubmit}>
      <h1 className="text-2xl text-gray-900 font-bold">Ordering Information</h1>
      <div className="border-b border-gray-200 my-5 space-y-6">
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

        <div>
          <Label htmlFor="email" className="text-md text-gray-700 mb-1">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            className="border border-gray-400 p-6 rounded-4xl"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <SelectAddressDropdown />
          </div>
        </div>

        <div>
          <Label htmlFor="note" className="text-md text-gray-700 mb-1">
            Note
          </Label>
          <Input
            id="note"
            name="note"
            className="border border-gray-400 p-6 rounded-4xl"
            placeholder="Enter your notes (eg: office hours)"
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </div>

        <div className="flex mb-10">
          <input
            type="checkbox"
            name="saveToAddressBook"
            checked={formik.values.saveToAddressBook}
            onChange={formik.handleChange}
            className="w-4 h-4 mt-1"
          />
          <span className="text-md text-gray-800 pl-2">Save to address book for next purchase</span>
        </div>
      </div>

      <div className="my-10">
        <h1 className="text-2xl text-gray-900 font-bold">Payment Method</h1>
        <div>
          <PaymentMethodCart />
        </div>
      </div>
    </form>
  );
};

export default InformationOrder;
