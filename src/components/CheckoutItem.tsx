import { OrderDetail } from "@/types/order";
import { formatPrice } from "@/utils/product";
import React from "react";

interface CartItemsProps {
  item: OrderDetail;
}

const CheckoutItem: React.FC<CartItemsProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-2 overflow-auto bg-neutral-50">
      <div className="md:flex gap-2">
        <img src={item.product.thumbnail} alt="product" className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md" />

        <div className="flex flex-col gap-2">
          <div>
            <p className="font-medium line-clamp-2">{item.product.name}</p>
          </div>
          <p className="text-gray-500 text-sm">
            {item.variant.variantValues.map((v) => v.optionValue.valueName).join(" / ")}
          </p>
        </div>
      </div>

      <div className="text-center content-center">{item.quantity}</div>
      <div className="text-center content-center">{formatPrice(item.variant.price)}</div>
      <div className="text-end content-center">{formatPrice(item.variant.price * item.quantity)}</div>
    </div>
  );
};

export default CheckoutItem;
