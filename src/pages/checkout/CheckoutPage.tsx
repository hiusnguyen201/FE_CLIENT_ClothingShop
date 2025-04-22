import React from "react";
import InfoOrderCheckout from "./InfoOrderCheckout";
import InfoUserCheckout from "./InfoUserCheckout";
import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";

const CheckOutPage: React.FC = () => {
  const ordersData = {
    orderId: "123231",
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
  const infoUserOrder = {
    name: "name",
    email: "abc@gmail.com",
    phone: "03999999",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    address: "Cầu Giấy, Hà Nội, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội",
  };
  return (
    <>
      <h2 className="section__header capitalize">Order Successfully</h2>
      <div className="text-center text-sm md:text-md space-y-2 px-4">
        <p>
          Trên thị trường có quá nhiều sự lựa chọn, cảm ơn bạn đã lựa chọn mua sắm tại <strong>Coolmate.me</strong>
        </p>
        <p>
          Đơn hàng của bạn <strong>CHẮC CHẮN</strong> đã được chuyển tới hệ thống xử lý đơn hàng của Coolmate. Trong quá
          trình xử lý Coolmate sẽ liên hệ lại nếu như cần thêm thông tin từ bạn.
        </p>
        <p>
          Ngoài ra Coolmate cũng sẽ có gửi xác nhận đơn hàng bằng <strong>Email</strong> và <strong>tin nhắn</strong>
        </p>
      </div>
      <div className="w-full text-center py-10">
        <Link
          to="/"
          className="min-w-50 p-5 bg-gray-900 hover:bg-gray-700 text-white rounded-4xl border-gray-50 text-center"
        >
          Explore more shop products here.
        </Link>
      </div>
      {ordersData.productOrderItem.length >= 1 ? (
        <div className="">
          <InfoOrderCheckout orderId={ordersData.orderId} productOderItem={ordersData.productOrderItem} />
          <InfoUserCheckout infoUserOrder={infoUserOrder} />
        </div>
      ) : (
        <div className="text-center lg-text:xl py-10 text-muted-foreground text-red-500">
          Order false in{" "}
          <Link to="/" className="text__underline hover:text-blue-500 text-red-500 text-md">
            Shop.
          </Link>{" "}
          Please try again
        </div>
      )}
    </>
  );
};

export default CheckOutPage;
