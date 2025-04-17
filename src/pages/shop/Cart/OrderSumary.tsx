import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const OrderSummary: React.FC = () => {
  const productsDataSelected = {
    selectedItemsName: "Quần nam Travel Shorts 7inch",
    discount: 0,
    freeDeliver: 0,
    totalPrice: 309.0,
    grandTotal: 309.0,
  };

  return (
    <div className="bg-primary-light mt-5 rounded text-base ">
      <div className="px-6 py-4 space-y-5 text-lg text-gray-900">
        <h2 className=" mt-2 text-2xl ">Total order amount</h2>
        <p className=" py-5 border-t border-gray-200">Selected Items: {productsDataSelected.selectedItemsName}</p>
        <p>Total Price: {productsDataSelected.totalPrice.toFixed(3)}đ</p>
        <p>Discount : {productsDataSelected.discount}đ</p>
        <p className="">Free Deliver : {productsDataSelected.freeDeliver}đ</p>
        <h3 className="font-bold border-t border-gray-200 py-5">
          GrandTotal: {productsDataSelected.grandTotal.toFixed(3)}đ
        </h3>
      </div>
      {/* footer */}
      <div className="fixed bottom-0 w-full lg:w-1/2 mx-auto h-28 bg-white shadow-2xl z-50 flex justify-between items-center px-8">
        <div>
          <div className="text-md text-gray-800">
            <p className="mt-1.5">
              Into Money{" "}
              <span className="text-2xl text-blue-500 font-semibold px-1">
                {productsDataSelected.grandTotal.toFixed(3)}đ
              </span>
            </p>
          </div>
          <div className="text-md text-gray-500">
            <Link to="/auth/login" className="text-blue-500 underline">
              Đăng nhập{" "}
            </Link>
            Được hoàn <span className="text-lg text-gray-900 font-bold">2.000 coin</span> | Tiết kiệm 0₫
          </div>
        </div>
        <Button className="w-48 h-14 bg-green-600 text-white rounded-md uppercase text-lg">
          Order now <i className="ri-bank-card-line"></i>
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
