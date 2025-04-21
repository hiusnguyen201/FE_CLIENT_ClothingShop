import React from "react";
import { Button } from "@/components/ui/button";

const FooterCartOrder: React.FC = () => {
  return (
    <div className="flex justify-end w-full h-20 gap-4 mt-2 lg:w-1/2 items-center right-0">
      <div className="text-right">
        <div className="text-sm text-gray-800">
          <p className="mt-1.5">
            Into Money <span className="text-xl text-blue-500 font-semibold px-1">309.000đ</span>
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <span className="text-sm text-gray-900"> Tiết kiệm 0₫</span>
        </div>
      </div>
      <Button className="lg:w-42 lg:h-12 md:w-36 md:h-10 bg-green-600 text-white rounded-md uppercase lg:text-lg mr-5 disabled:bg-gray-500">
        Order now <i className="ri-bank-card-line"></i>
      </Button>
    </div>
  );
};

export default FooterCartOrder;
