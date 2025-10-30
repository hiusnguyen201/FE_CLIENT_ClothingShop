import React, { useEffect, useMemo } from "react";
import CartItems from "@/pages/cart/CartItems";
import UserInfo from "@/pages/cart/InformationOrder";
import FooterCartOrder from "@/pages/cart/FooterCartOrder";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useFormik } from "formik";
import { informationOrderSchema } from "./schema/infoOrderSchema";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/cart/cart.thunk";
import { LoadingCenter } from "@/components/LoadingCenter";
import { LoadingButton } from "@/components/LoadingButton";
import OrderSummary from "./OrderSummary";
import PaymentMethodList from "./PaymentMethodList";
import { getAddressList } from "@/redux/address/address.thunk";
import AddressInfo from "./AddressInfo";
import { Address } from "@/types/division";
import { setCheckoutData, setCreateOrder } from "@/redux/order/order.slice";
import { showToast } from "@/utils/toast";
import { getDistricts, getProvinces, getWards } from "@/redux/division/division.thunk";
import { PAYMENT_METHODS } from "@/types/constant";
import { createOrder, getOrder } from "@/redux/order/order.thunk";
import { emptyCart } from "@/redux/cart/cart.slice";

export interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: Address;
  note: string;
  paymentMethod: string;
}

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addressList, loading: addressLoading } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.account);
  const { cart, loading: cartLoading } = useAppSelector((state) => state.cart);
  const { loading: orderLoading } = useAppSelector((state) => state.order);
  const { provinces } = useAppSelector((state) => state.division);

  useEffect(() => {
    dispatch(getAddressList());
  }, [dispatch]);

  const defaultAddress = useMemo(() => {
    return (
      addressList.find((a) => a.isDefault) || {
        id: "",
        address: "",
        provinceName: "",
        districtName: "",
        wardName: "",
        isDefault: false,
        customer: "",
      }
    );
  }, [addressList]);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      email: user?.email || "",
      address: defaultAddress,
      note: "note",
      paymentMethod: PAYMENT_METHODS[0].method,
    },
    validationSchema: informationOrderSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      dispatch(setCreateOrder(true));
      let provincesList = provinces;
      if (!provinces?.length) {
        provincesList = (await dispatch(getProvinces()).unwrap()).data.list;
      }

      if (!provincesList) {
        return;
      }
      const province = provincesList.find((province) => province.ProvinceName === values.address.provinceName);

      if (!province) {
        showToast(false, "Invalid province");
        return;
      }
      const provinceId = province.ProvinceID;

      try {
        const districts = (await dispatch(getDistricts({ provinceId: province.ProvinceID })).unwrap()).data.list;

        const district = districts.find((d) => d.DistrictName === values.address.districtName);
        if (!district) {
          showToast(false, "Invalid district");
          return;
        }
        const districtId = district.DistrictID;

        const wards = (await dispatch(getWards({ districtId: district.DistrictID })).unwrap()).data.list;

        const ward = wards.find((d) => d.WardName === values.address.wardName);
        if (!ward) {
          showToast(false, "Invalid ward");
          return;
        }

        const wardCode = ward.WardCode;

        const order = await dispatch(
          createOrder({
            customerName: values.fullName,
            customerEmail: values.email,
            customerPhone: values.phoneNumber,
            provinceId: provinceId,
            districtId: districtId,
            wardCode: wardCode,
            address: values.address.address,
            notes: values.note,
            paymentMethod: values.paymentMethod,
            productVariants: cart.map((item) => {
              return {
                id: item.productVariant._id,
                quantity: item.quantity,
              };
            }),
          })
        ).unwrap();

        if (order.code === 200) {
          dispatch(setCreateOrder(true));
          const orderData = await dispatch(getOrder({ id: order.data.id })).unwrap();

          const paymentUrl = orderData.data.payment?.paymentUrl;
          if (paymentUrl) {
            window.location.href = paymentUrl;
            return;
          }
          dispatch(setCheckoutData(orderData.data));
          dispatch(emptyCart());
          navigate(`/checkout/success`);
        }
      } catch (error) {
        showToast(false, "Invalid address or unknown error");
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-col md:flex-row-reverse gap-4 justify-between">
          <div className="md:w-1/2">
            <h4 className="text-2xl font-semibold">Your Cart</h4>
            {cartLoading.getCart ? (
              <LoadingCenter />
            ) : cart.length ? (
              <>
                <div className="py-2 flex justify-between items-center border-b">
                  <div>
                    <LoadingButton
                      variant={"outline"}
                      disabled={cartLoading.clearCart || orderLoading.createOrder}
                      loading={cartLoading.clearCart}
                      onClick={() => dispatch(clearCart())}
                    >
                      Clear all item
                    </LoadingButton>
                  </div>

                  <div className="flex flex-row gap-16">
                    <div>Quantity</div>
                    <div>Price</div>
                  </div>
                </div>

                <div className="flex flex-col">
                  {cart.map((item) => (
                    <CartItems key={item.productVariant._id} item={item} />
                  ))}
                </div>

                <OrderSummary cartData={cart} />
              </>
            ) : (
              <div className="text-center mt-10">Add item first</div>
            )}
          </div>

          <div className="md:w-1/2">
            <UserInfo formik={formik} />

            {addressLoading.getAddressList ? (
              <div className="my-4">
                <LoadingCenter />
              </div>
            ) : (
              <>
                <AddressInfo addressList={addressList} formikProps={formik} />
                <PaymentMethodList formikProps={formik} />
              </>
            )}
          </div>
        </div>
      </div>

      <FooterCartOrder cartData={cart} formikProps={formik} />
    </>
  );
};

export default CartPage;
