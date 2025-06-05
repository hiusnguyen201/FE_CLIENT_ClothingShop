import { Button } from "@/components/ui/button";
import { PAYMENT_METHODS } from "@/types/constant";
import clsx from "clsx";
import { FormikProps } from "formik";
import { CircleDotIcon, CircleIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { FormValues } from "./CartPage";

interface PaymentMethodProps {
  formikProps: FormikProps<FormValues>;
}

const PaymentMethodList: React.FC<PaymentMethodProps> = ({ formikProps }) => {

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Payment Method</h1>

      <div className="space-y-4">
        {PAYMENT_METHODS.map((m) => (
          <Button
            type="button"
            key={m.id}
            onClick={() => {
              formikProps.setFieldValue("paymentMethod", m.method)
            }}
            className={clsx('p-4 border rounded-xl transition-all w-full h-16 gap-2 justify-start',
              formikProps.values.paymentMethod === m.method
                ? "border-blue-600 bg-blue-50 hover:bg-gray-50"
                : "border-gray-300 bg-white hover:bg-gray-50"
            )}
          >
            {formikProps.values.paymentMethod === m.method ?
              <CircleDotIcon className="w-4 h-4" color="black" />
              : <CircleIcon className="w-4 h-4" color="black" />
            }
            <img src={m.img} alt={m.label} className="w-12 h-12" />
            <div className="font-medium text-gray-800">{m.label}</div>
          </Button>
        ))}

        <div className="text-md">
          If you are not satisfied with our product? You can return it. Learn more&nbsp;
          <Link to="#" className="text-blue-500">
            here
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentMethodList;
