import { Button } from "@/components/ui/button";
import { Address } from "@/types/division";
import clsx from "clsx";
import { FormikProps } from "formik";
import { CircleDotIcon, CircleIcon } from "lucide-react";
import React from "react";
import { FormValues } from "./CartPage";

interface AddressInfoProps {
  formikProps: FormikProps<FormValues>;
  addressList: Address[];
}

const AddressInfo: React.FC<AddressInfoProps> = ({ formikProps, addressList }) => {
  const { errors } = formikProps;
  const error: string = errors["address"] as string;

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Address list</h1>

      <div className="space-y-4">
        {addressList.map((a) => (
          <Button
            type="button"
            key={a.id}
            title={[a.address, a.wardName, a.districtName, a.provinceName].join(', ')}
            onClick={() => {
              formikProps.setFieldValue("address", a);
            }}
            className={clsx('p-4 border rounded-xl transition-all w-full h-16 gap-2 justify-start',
              formikProps.values.address.id === a.id
                ? "border-blue-600 bg-blue-50 hover:bg-gray-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            )}
          >
            {formikProps.values.address.id === a.id ?
              <CircleDotIcon className="w-4 h-4" color="black" />
              : <CircleIcon className="w-4 h-4" color="black" />
            }
            <div className="font-medium text-gray-800 line-clamp-1">
              {[a.address, a.wardName, a.districtName, a.provinceName].filter(Boolean).join(', ')}
            </div>
          </Button>
        ))}

        {error && <p className="text-sm text-red-500 font-normal mt-2">{error}</p>}

      </div >
    </>
  );
};

export default AddressInfo;
