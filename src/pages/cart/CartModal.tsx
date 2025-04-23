import React, { useState, useEffect } from "react";
import OrderSummary from "@/pages/cart/OrderSummary";
import CartItems from "@/pages/cart/CartItems";
import InformationOrder from "@/pages/cart/InformationOrder";
import FooterCartOrder from "@/pages/cart/footerCart/FooterCartOrder";
import FooterCartPayment from "./footerCart/FooterCartPayment";
import { Cart } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useFormik } from "formik";
import { informationOrderSchema } from "./schema/infoOrderSchema";
import { getDistricts, getWards } from "@/redux/division/division.thunk";
import { toast } from "@/hooks/use-toast";
import { createOrder } from "@/redux/order/order.thunk";
import { useNavigate } from "react-router-dom";

interface CartModalProps {
  isCartOpen: boolean;
  onClose: () => void;
  cartData: Cart[];
}

const CartModal: React.FC<CartModalProps> = ({ isCartOpen, onClose, cartData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addressList } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.account);
  const { provinces } = useAppSelector((state) => state.division);
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
      ward: addessDefault?.wardName || "",
      note: "notes",
      method: "cash on delivery",
      provinceCode: 0,
      districtCode: 0,
      wardCode: "",
      province: addessDefault?.provinceName || "",
      district: addessDefault?.districtName || "",
    },
    validationSchema: informationOrderSchema,
    onSubmit: async (values) => {
      if (!provinces) {
        return;
      }
      const province = provinces.find((province) => province.ProvinceName === values.province);

      if (!province) {
        toast({ title: "Invalid address", variant: "destructive" });
        return;
      }
      values.provinceCode = province.ProvinceID;

      try {
        const resDistricts = await dispatch(getDistricts({ provinceCode: province.ProvinceID })).unwrap();
        const districts = resDistricts.data.list;

        const district = districts.find((d) => d.DistrictName === values.district);
        if (!district) {
          toast({ title: "Invalid district", variant: "destructive" });
          return;
        }
        values.districtCode = district.DistrictID;

        const resWards = await dispatch(getWards({ districtCode: district.DistrictID })).unwrap();
        const wards = resWards.data.list;

        const ward = wards.find((d) => d.WardName === values.ward);
        if (!ward) {
          toast({ title: "Invalid ward", variant: "destructive" });
          return;
        }

        values.wardCode = ward.WardCode;

        const order = await dispatch(
          createOrder({
            customerName: values.fullName,
            customerEmail: values.email,
            customerPhone: values.phoneNumber,
            provinceCode: values.provinceCode,
            districtCode: values.districtCode,
            wardCode: values.wardCode,
            address: values.address,
            customerId: user?.id || "",
            notes: values.note,
            paymentMethod: values.method,
            productVariants: cartData.map((cart) => {
              return {
                id: cart.productVariant._id,
                quantity: cart.quantity,
              };
            }),
          })
        ).unwrap();
        if (order.code === 200) {
          toast({ title: "Order successfully" });
          navigate("/");
        }
      } catch (error) {
        toast({ title: "Invalid address or unknown error", variant: "destructive" });
        console.error(error);
      }
    },
  });

  const cartFormat = cartData.filter((cart) => cart.productVariant.quantity > 0);

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
              {cartFormat.length ? (
                <CartItems cartData={cartFormat} />
              ) : (
                <div className="text-center mt-10">Add item first</div>
              )}
              {cartFormat.length ? <OrderSummary cartData={cartFormat} /> : null}
            </div>
          </div>
          <div className="w-full lg:w-2/3 mt-3">
            <InformationOrder formik={formik} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full right-0 lg:h-25 h-42 bg-white shadow-2xl flex flex-col lg:flex-row align-end items-center text-right">
        <FooterCartPayment />
        <FooterCartOrder cartData={cartFormat} handleSubmit={formik.handleSubmit} />
      </div>
    </div>
  );
};

export default CartModal;
