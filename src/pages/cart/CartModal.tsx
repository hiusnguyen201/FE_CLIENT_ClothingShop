import React, { useState, useEffect } from "react";
import OrderSummary from "@/pages/cart/OrderSummary";
import CartItems from "@/pages/cart/CartItems";
import InformationOrder from "@/pages/cart/InformationOrder";
import FooterCartOrder from "@/pages/cart/footerCart/FooterCartOrder";
import FooterCartPayment from "./footerCart/FooterCartPayment";
import { Cart } from "@/types/cart";
import { useAppSelector } from "@/redux/store";
import { useFormik } from "formik";
import { informationOrderSchema } from "./schema/infoOrderSchema";

interface CartModalProps {
  isCartOpen: boolean;
  onClose: () => void;
  cartData: Cart[];
}

const CartModal: React.FC<CartModalProps> = ({ isCartOpen, onClose, cartData }) => {
  const { addressList } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.account);

  const [showAnimation, setShowAnimation] = useState(false);
  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => setShowAnimation(true), 3);
    } else {
      setShowAnimation(false);
      if (!isCartOpen) return;
    }
  }, [isCartOpen]);

  const addessDefault = addressList.find((address) => address.isDefault);

  const formik = useFormik({
    initialValues: {
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      email: user?.email || "",
      address: addessDefault?.address || "",
      province: addessDefault?.provinceName || "",
      district: addessDefault?.districtName || "",
      ward: addessDefault?.wardName || "",
      note: "",
      method: "cod"
    },
    validationSchema: informationOrderSchema,
    onSubmit: (values) => {
      console.log("Form values:", values);
    },
  });

  return (
    <div className="fixed inset-0 backdrop-blur-md transition-opacity z-50 md:px-10 lg:px-10">
      {/* Modal chính */}
      <div
        className={`fixed right-0 w-full bg-white h-full overflow-y-auto transform transition-all duration-300 ease-in-out ${showAnimation ? "translate-x-0" : "translate-x-full"
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
              {cartData.length ? <CartItems cartData={cartData} /> : <div className="text-center mt-10">Add item first</div>}
              {cartData.length ? <OrderSummary cartData={cartData} /> : null}
            </div>
          </div>
          <div className="w-full lg:w-2/3 mt-3">
            <InformationOrder formik={formik} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full right-0 lg:h-25 h-42 bg-white shadow-2xl flex flex-col lg:flex-row align-end items-center text-right">
        <FooterCartPayment />
        <FooterCartOrder cartData={cartData} handleSubmit={formik.handleSubmit} />
      </div>
    </div>
  );
};

export default CartModal;
