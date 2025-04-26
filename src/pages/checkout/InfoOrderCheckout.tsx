import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import { formatPrice } from "@/utils/product";

interface InfoOrderCheckoutProps {
  order: Order;
}

const InfoOrderCheckout: React.FC<InfoOrderCheckoutProps> = ({ order }) => {

  return (
    <div>
      <Card className="w-full max-w-5xl mx-auto mt-6 border-none">
        <CardContent className="p-4">
          <h2 className="text-center text-2xl font-bold mb-4">
            Order information <span className="text-gray-500">#{order.id}</span>
          </h2>

          {/* Header Table */}
          <div className="grid grid-cols-6 bg-blue-600 text-white font-semibold py-2 px-3 rounded-t-md text-center">
            <div className="col-span-2">Product</div>
            <div>Quantity</div>
            <div>Listed price</div>
            <div>Variant</div>
            <div>Make money</div>
          </div>

          {/* Product List */}
          {order?.orderDetails?.map((detail) => (
            <div key={detail.id} className="grid grid-cols-6 items-center justify-center bg-gray-100 px-3 py-4 border-b border-gray-200">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-16 h-16">
                  <img src={detail.product.thumbnail} alt={detail.product.name} className="object-cover rounded " />
                </div>
                <div>{detail.product.name}</div>
              </div>
              <div className="text-center">{detail.quantity}</div>
              <div className="text-center">
                <span className="line-through text-sm text-gray-400 block">
                  {formatPrice(detail.variant.price)}
                </span>
                <span className="text-base font-medium">{formatPrice(detail.unitPrice)}</span>
              </div>
              <div className="text-center">
                {detail.variant.variantValues.map((item) =>
                  <div key={item.id}>
                    {item.option.name}: {item.optionValue.valueName}
                  </div>
                )}
              </div>
              <div className="text-center">
                {formatPrice(detail.unitPrice * detail.quantity)}
              </div>
            </div>
          ))}

          <div className="divide-y divide-gray-200 text-sm mt-2">
            <div className="flex justify-between py-2">
              <span>Total product value</span>
              <span>{formatPrice(order.subTotal)}</span>
            </div>
            {/* <div className="flex justify-between py-2">
              <span>Total discount</span>
              <span className="text-red-500">-{totalDiscount.toLocaleString()}đ</span>
            </div> */}
            <div className="flex justify-between py-2">
              <span>Shipping Fee</span>
              <span>{formatPrice(order.shippingFee)}</span>
            </div>
          </div>

          {/* Total Payment */}
          <div className="bg-black text-white mt-4 px-4 py-3 rounded-b-md flex justify-between items-center text-lg font-bold">
            <span>Total payment</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoOrderCheckout;
