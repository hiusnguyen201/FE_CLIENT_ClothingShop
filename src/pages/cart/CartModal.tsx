import { Product } from "@/models/Products";
import React, { useState, useEffect } from "react";
import OrderSummary from "@/pages/cart/OrderSummary";
import CartItems from "@/pages/cart/CartItems";
import InformationOrder from "@/pages/cart/InformationOrder";
import FooterCartOrder from "@/pages/cart/footerCart/footerCartOrder";
import FooterCartPayment from "./footerCart/FooterCartPayment";

interface CartModalProps {
  isCartOpen: boolean;
  onClose: () => void;
  productsData: Product[];
}

const CartModal: React.FC<CartModalProps> = ({ isCartOpen, onClose, productsData }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => setShowAnimation(true), 3);
    } else {
      setShowAnimation(false);
      if (!isCartOpen) return;
    }
  }, [isCartOpen]);

  return (
    <div className="fixed inset-0 backdrop-blur-md transition-opacity z-50 md:px-10 lg:px-10">
      {/* Modal chính */}
      <div
        className={`fixed right-0 w-full bg-white h-full overflow-y-auto transform transition-all duration-300 ease-in-out ${
          showAnimation ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row-reverse gap-4  border-t border-gray-100">
          <div className="items-center mb-4 w-full lg:w-1/2 mt-3">
            <div className="flex justify-between mx-6">
              <h4 className="text-2xl font-semibold ">Your Cart</h4>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                <i className="ri-close-large-line p-2 ml-3 text-xl"></i>
              </button>
            </div>
            {/* cart items */}
            <div>
              {productsData.length && <CartItems productsData={productsData} />}
              {productsData.length > 0 && <OrderSummary />}
            </div>
          </div>
          <div className="w-full lg:w-2/3 mt-3">
            <InformationOrder />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full right-0 lg:h-25 h-42 bg-white shadow-2xl flex flex-col lg:flex-row align-end items-center text-right">
        <FooterCartPayment />
        <FooterCartOrder />
      </div>
    </div>
  );
};

export default CartModal;
