import { Cart } from "@/types/cart";
import { calculateTotalPrice, formatPrice } from "@/utils/product";
import React from "react";

interface CartItemsProps {
  cartData: Cart[];
}

const OrderSummary: React.FC<CartItemsProps> = ({ cartData }) => {
  const totalPrice = calculateTotalPrice(cartData);
  const discount = 0;
  const freeDelivery = 0;
  const grandTotal = totalPrice - discount + freeDelivery;

  return (
    <div>
      <div className="bg-primary-light mt-5 rounded text-base">
        <div className="px-6 py-4 space-y-5 text-lg text-gray-900">
          <h2 className=" mt-2 text-2xl ">Total order amount</h2>
          {/* <p className=" py-5 border-t border-gray-200">Selected Items: {productsDataSelected.selectedItemsName}</p> */}
          <p>Total Price: {formatPrice(totalPrice)}</p>
          <p>Discount : {formatPrice(discount)}</p>
          <p className="">Free Deliver : {formatPrice(freeDelivery)}</p>
          <h3 className="font-bold border-t border-gray-200 py-5">
            Grand Total: {formatPrice(grandTotal)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
