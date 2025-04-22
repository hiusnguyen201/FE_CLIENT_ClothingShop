import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PaymentMethodCart from "@/pages/cart/PaymentMethodCart";
import { FormikProps } from "formik";

interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  province: string;
  district: string;
  ward: string;
  note: string;
  method: string;
}

interface InformationOrderProps {
  formik: FormikProps<FormValues>;
}

const InformationOrder: React.FC<InformationOrderProps> = ({ formik }) => {

  return (
    <form className="px-5 lg:ml-15">
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
              readOnly={true}
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
              readOnly={true}
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
            readOnly={true}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <div className="space-y-4 w-full">
              <div>
                <Label htmlFor="address" className="text-md text-gray-700 mb-1">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  className="border border-gray-400 p-6 rounded-4xl"
                  placeholder="Enter your address (eg: 123 Cau Giay , Ha Noi )"
                  value={formik.values.address}
                  readOnly={true}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                )}
              </div>
            </div>
            <div className="lg:flex justify-between text-gray-800 text-md">
              {/* Province */}
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="relative overflow-visible z-50">
                  <Label className="block font-medium text-md mb-1">Tỉnh / Thành phố</Label>
                  <Input
                    id="province"
                    name="province"
                    className="border border-gray-400 p-6 rounded-4xl"
                    value={formik.values.province}
                    readOnly={true}
                  />
                  {formik.touched.province && formik.errors.province && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.province}</div>
                  )}
                </div>

                {/* District */}
                <div className="relative overflow-visible z-40">
                  <Label className="block font-medium text-md mb-1">Quận / Huyện</Label>
                  <Input
                    id="district"
                    name="district"
                    className="border border-gray-400 p-6 rounded-4xl"
                    value={formik.values.district}
                    readOnly={true}
                  />
                  {formik.touched.district && formik.errors.district && (
                    <div className="text-red-500 text-sm mt-1">{formik.errors.district}</div>
                  )}
                </div>
              </div>
            </div>
            {/* Ward */}
            <div className="relative overflow-visible z-30">
              <Label className="block font-medium text-md mb-1">Phường / Xã</Label>
              <Input
                id="ward"
                name="ward"
                className="border border-gray-400 p-6 rounded-4xl"
                value={formik.values.ward}
                readOnly={true}
              />
              {formik.touched.ward && formik.errors.ward && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.ward}</div>
              )}
            </div>
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
      </div>

      <div className="my-10">
        <h1 className="text-2xl text-gray-900 font-bold">Payment Method</h1>
        <div>
          <PaymentMethodCart formik={formik} />
        </div>
      </div>
    </form>
  );
};

export default InformationOrder;
