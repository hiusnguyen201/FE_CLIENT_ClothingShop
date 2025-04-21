import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface PaymentMethod {
  id: string;
  label: string;
  iconImg: string;
}

const PaymentMethodCart: React.FC = () => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      label: "Cash on Delivery",
      iconImg: "https://mcdn.coolmate.me/image/October2024/mceclip2_42.png",
    },
    { id: "2", label: "MoMo Wallet", iconImg: "https://mcdn.coolmate.me/image/October2024/mceclip1_171.png" },
    { id: "3", label: "VNPAY e-wallet", iconImg: "https://mcdn.coolmate.me/image/October2024/mceclip0_81.png" },
  ];
  const [selectedMethod, setSelectedMethod] = useState<string>("1");
  return (
    <>
      <div className="space-y-4 mt-4 mb-50">
        {paymentMethods.map((method) => (
          <Button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all w-full h-17 ${
              selectedMethod === method.id
                ? "border-blue-600 bg-blue-50 shadow-md"
                : "border-gray-300 bg-white hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-center items-center space-x-2">
              <img src={method.iconImg} alt="" className="w-12 h-12" />
              <div className="font-medium text-gray-800">{method.label}</div>
            </div>
            <div className="ml-auto">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  selectedMethod === method.id ? "border-blue-500 bg-blue-500" : "border-gray-400"
                }`}
              ></div>
            </div>
          </Button>
        ))}
        <span className="text-md">
          If you are not satisfied with our product? You can return it. Learn more{" "}
          <Link to="#" className="text-blue-500">
            here
          </Link>
          .
        </span>
      </div>
    </>
  );
};

export default PaymentMethodCart;
