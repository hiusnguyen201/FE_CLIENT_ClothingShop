import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ProductOrderItem {
  name: string;
  image: string;
  quantity: number;
  originalPrice: number;
  price: number;
  variant: string;
  total: number;
}

interface InfoOrderCheckoutProps {
  orderId: string;
  productOderItem: ProductOrderItem[];
}

const InfoOrderCheckout: React.FC<InfoOrderCheckoutProps> = ({ orderId, productOderItem }) => {
  const totalPrice = productOderItem.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const totalDiscount = productOderItem.reduce(
    (acc, product) => acc + (product.originalPrice * product.quantity - product.price * product.quantity),
    0
  );

  const shippingFee = 0;
  const totalPayment = totalPrice + shippingFee;

  return (
    <div>
      <Card className="w-full max-w-5xl mx-auto mt-6 border-none">
        <CardContent className="p-4">
          <h2 className="text-center text-2xl font-bold mb-4">
            Order information <span className="text-gray-500">#{orderId}</span>
          </h2>

          {/* Header Table */}
          <div className="grid grid-cols-6 bg-blue-600 text-white font-semibold py-2 px-3 rounded-t-md">
            <div className="col-span-2">Product Name</div>
            <div>Quantity</div>
            <div>Listed price</div>
            <div>Variant</div>
            <div>Make money</div>
          </div>

          {/* Product List */}
          {productOderItem.map((product, index) => (
            <div key={index} className="grid grid-cols-6 items-center bg-gray-100 px-3 py-4 border-b border-gray-200">
              <div className="col-span-2 flex items-center gap-3">
                <div className="aspect-[3/4]">
                  <img src={product.image} alt={product.name} className="object-cover rounded  min-w-30 h-35" />
                </div>
                <span>{product.name}</span>
              </div>
              <div>{product.quantity}</div>
              <div>
                <span className="line-through text-sm text-gray-400 block">
                  {product.originalPrice.toLocaleString()}đ
                </span>
                <span className="text-base font-medium">{product.price.toLocaleString()}đ</span>
              </div>
              <div>{product.variant}</div>
              <div>{(product.price * product.quantity).toLocaleString()}đ</div>
            </div>
          ))}

          <div className="divide-y divide-gray-200 text-sm mt-2">
            <div className="flex justify-between py-2">
              <span>Total product value</span>
              <span>{totalPrice.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Total discount</span>
              <span className="text-red-500">-{totalDiscount.toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping Fee</span>
              <span>{shippingFee.toLocaleString()}đ</span>
            </div>
          </div>

          {/* Total Payment */}
          <div className="bg-black text-white mt-4 px-4 py-3 rounded-b-md flex justify-between items-center text-lg font-bold">
            <span>Total payment</span>
            <span>{totalPayment.toLocaleString()}đ</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoOrderCheckout;
