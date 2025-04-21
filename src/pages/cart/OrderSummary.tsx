import React from "react";

const OrderSummary: React.FC = () => {
  const productsDataSelected = {
    selectedItemsName: "Quần nam Travel Shorts 7inch",
    discount: 0,
    freeDeliver: 0,
    totalPrice: 309.0,
    grandTotal: 309.0,
  };

  return (
    <div>
      <div className="bg-primary-light mt-5 rounded text-base">
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
      </div>
    </div>
  );
};

export default OrderSummary;
