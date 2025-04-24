import React from "react";
import { Button } from "@/components/ui/button"; // hoặc bạn dùng <button> thường cũng được
import InfoUserCheckout from "../checkout/InfoUserCheckout";
import InfoOrderCheckout from "../checkout/InfoOrderCheckout";

const OrderDetailPage: React.FC = () => {
  const infoUserOrder = {
    name: "name",
    email: "abc@gmail.com",
    phone: "03999999",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    address: "Cầu Giấy, Hà Nội, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
  };

  const order = {
    paymentMethod: "COD",
    id: "70285907587",
    date: "18:32 22.04.2025",
    timeline: [
      {
        title: "Wait for Confirmation",
        description: "The system is confirming your order.",
        time: "18:32 22-04-2025",
      },
    ],
    productOrderItem: [
      {
        name: "Quần Shorts Summer Cool 7inch 2 lớp",
        image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg",
        quantity: 1,
        originalPrice: 399000,
        price: 359000,
        variant: "Xanh nhạt / M",
        total: 359000,
      },
      {
        name: "Áo Thun Basic Cotton",
        image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg",
        quantity: 2,
        originalPrice: 199000,
        price: 179000,
        variant: "Đen / L",
        total: 358000,
      },
    ],
  };

  // const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl px-4">
      <h2 className="lg:text-2xl text-xl font-semibold mb-2">
        Thông tin đơn hàng <span className="text-blue-600">#{order.id}</span>
      </h2>
      <div>
        <InfoUserCheckout infoUserOrder={infoUserOrder} />
      </div>

      <div className="flex gap-4 mb-10 mx-5">
        <Button className="bg-gray-100 border border-gray-200 hover:bg-gray-200">Need support</Button>
        <Button className="bg-gray-100 border border-gray-200 hover:bg-gray-200">Buy back</Button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Order status</h3>
      <div className="relative border-l-2 border-gray-300 pl-4 space-y-6 mb-10">
        {order.timeline.map((step, index) => (
          <div key={index} className="relative pl-6">
            <div className="absolute -left-3 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="font-semibold">{step.title}</div>
            <div className="text-sm text-gray-600">{step.description}</div>
            <div className="text-xs text-gray-500">{step.time}</div>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">Order Product Details</h3>
      <div>
        <InfoOrderCheckout orderId={order.id} productOderItem={order.productOrderItem} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
