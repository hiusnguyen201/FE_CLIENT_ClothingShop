import React from "react";
import { Button } from "@/components/ui/button";
import { Cart } from "@/types/cart";
import { calculateTotalPrice, formatPrice } from "@/utils/product";
import { PAYMENT_METHODS } from "@/types/constant";
import { FormikProps } from "formik";
import { FormValues } from "./CartPage";

interface CartItemsProps {
  cartData: Cart[];
  formikProps: FormikProps<FormValues>;
}

const FooterCartOrder: React.FC<CartItemsProps> = ({ cartData, formikProps }) => {
  const totalPrice = calculateTotalPrice(cartData);
  const discount = 0;
  const freeDelivery = 0;
  const grandTotal = totalPrice - discount + freeDelivery;

  const paymentMethod = formikProps.values.paymentMethod;
  const paymentMethodInfo = PAYMENT_METHODS.find((m) => m.method === paymentMethod);

  return (
    <div className="fixed bottom-0 w-full px-4 bg-white border">
      <div className="flex flex-row gap-4 justify-between items-center h-20">
        <div className="md:px-28 flex items-center gap-4">
          <img src={paymentMethodInfo?.img} alt={paymentMethodInfo?.img} className="w-12 h-12 object-contain" />
          {paymentMethodInfo?.method === "cash on delivery" && (<p>{paymentMethodInfo.label}</p>)}
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="text-sm">Price
            <span className="text-xl">{formatPrice(grandTotal)}</span>
          </div>

          <Button
            type="button"
            className="rounded-full px-20 py-6"
            onClick={() => formikProps.handleSubmit()}
          >Checkout
          </Button>
        </div>

      </div>
    </div>
  );
};

export default FooterCartOrder;
