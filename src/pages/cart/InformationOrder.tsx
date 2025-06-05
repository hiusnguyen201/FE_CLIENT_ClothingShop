import React from "react";
import { FormikProps } from "formik";
import { InputFormikField } from "@/components/formik-fields";
import { FormValues } from "./CartPage";


interface UserInfoProps {
  formik: FormikProps<FormValues>;
  className?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ formik, className = "" }) => {

  return (
    <div className={`space-y-4 ${className}`}>
      <h1 className="text-2xl text-gray-900 font-bold">User Info</h1>

      <div className="space-y-4">
        <div className="flex gap-4 w-full">
          <InputFormikField
            className="w-2/3"
            formikProps={formik}
            name="fullName"
            type="text"
            label="Full name"
            placeholder="Enter your full name"
            required
          />

          <InputFormikField
            className="w-1/3"
            formikProps={formik}
            name="phoneNumber"
            type="text"
            label="Phone number"
            placeholder="Enter your phone number"
            required
          />

        </div>

        <InputFormikField
          formikProps={formik}
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <InputFormikField
          formikProps={formik}
          name="note"
          type="text"
          placeholder="Note here"
        />

      </div>

    </div>
  );
};

export default UserInfo;
