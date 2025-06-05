import { Cart } from "@/types/cart";
import { calculateTotalPrice, formatPrice } from "@/utils/product";
import clsx from "clsx";
import React, { Fragment } from "react";

interface OrderSummaryProps {
  cartData: Cart[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartData }) => {
  const totalPrice = calculateTotalPrice(cartData);
  const discount = 0;
  const freeDelivery = 0;
  const grandTotal = totalPrice - discount + freeDelivery;

  const summaryData = [
    { label: "Total Price", value: totalPrice },
    { label: "Discount", value: discount },
    { label: "Free Delivery", value: freeDelivery },
    { label: "Grand Total", value: grandTotal, highlight: true },
  ];

  return (
    <div className="py-4">
      <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
        {summaryData.map(({ label, value, highlight }, i) => (
          <Fragment key={i}>
            <div className={clsx(highlight && "font-bold border-t py-2")}>
              {label}
            </div>
            <div className={clsx("text-right", highlight && "font-bold border-t py-2")}>
              {formatPrice(value)}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
