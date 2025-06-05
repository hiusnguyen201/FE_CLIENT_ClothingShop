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
import { setCheckoutData } from "@/redux/order/order.slice";

export interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: Address;
  note: string;
  paymentMethod: string;
  // provinceCode: string,
  // districtCode: string,
  // wardCode: string,
}

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addressList, loading: addressLoading } = useAppSelector((state) => state.address);
  const { user } = useAppSelector((state) => state.account);
  const { cart, loading: cartLoading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAddressList());
  }, [dispatch]);

  const defaultAddress = useMemo(() => {
    return addressList.find((a) => a.isDefault) || {
      id: "",
      address: "",
      provinceName: "",
      districtName: "",
      wardName: "",
      isDefault: false,
      customer: "",
    };
  }, [addressList]);

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      email: user?.email || "",
      address: defaultAddress,
      note: "",
      paymentMethod: "cash on delivery",
    },
    validationSchema: informationOrderSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const simplifiedCart = cart.map((item) => ({
        productVariant: item.productVariant._id,
        quantity: item.quantity,
      }));

      dispatch(setCheckoutData({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        note: values.note,
        paymentMethod: values.paymentMethod,
        address: values.address,
        cart: simplifiedCart
      }))

      navigate('/checkout');
      // if (!provinces) {
      //   return
      // }
      // const province = provinces.find(province => province.ProvinceName === values.province);

      // if (!province) {
      //   showToast(false, "Invalid province");
      //   return;
      // }
      // values.provinceCode = province.ProvinceID;

      // try {
      //   const resDistricts = await dispatch(getDistricts({ provinceCode: province.ProvinceID })).unwrap();
      //   const districts = resDistricts.data.list;

      //   const district = districts.find(d => d.DistrictName === values.district);
      //   if (!district) {
      //     showToast(false, "Invalid district");
      //     return;
      //   }
      //   values.districtCode = district.DistrictID;

      //   const resWards = await dispatch(getWards({ districtCode: district.DistrictID })).unwrap();
      //   const wards = resWards.data.list;

      //   const ward = wards.find(d => d.WardName === values.ward);
      //   if (!ward) {
      //     showToast(false, "Invalid ward");
      //     return;
      //   }

      //   values.wardCode = ward.WardCode;

      //   const order = await dispatch(createOrder({
      //     customerName: values.fullName,
      //     customerEmail: values.email,
      //     customerPhone: values.phoneNumber,
      //     provinceCode: values.provinceCode,
      //     districtCode: values.districtCode,
      //     wardCode: values.wardCode,
      //     address: values.address,
      //     notes: values.note,
      //     paymentMethod: values.method,
      //     productVariants: cart.map((item) => {
      //       return {
      //         id: item.productVariant._id,
      //         quantity: item.quantity
      //       }
      //     })
      //   })).unwrap();

      //   if (order.code === 200) {
      //     toast({ title: "Order successfully" })
      //     navigate(`/get-order/${order.data.id}`);
      //   }

      // } catch (error) {
      //   toast({ title: "Invalid address or unknown error", variant: "destructive" });
      //   console.error(error);
      // }
    }
  });

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-col md:flex-row-reverse gap-4 justify-between">

          <div className="md:w-1/2">
            <h4 className="text-2xl font-semibold">Your Cart</h4>
            {cartLoading.getCart ?
              <LoadingCenter />
              : cart.length ? (
                <>
                  <div className="py-2 flex justify-between items-center border-b">
                    <div className="">
                      <LoadingButton
                        variant={"outline"}
                        disabled={cartLoading.clearCart}
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
                      <CartItems
                        key={item.productVariant._id}
                        item={item} />
                    ))}
                  </div>

                  <OrderSummary cartData={cart} />
                </>
              ) : (
                <div className="text-center mt-10">Add item first</div>
              )}

          </div>

          <div className="md:w-1/2">

            <UserInfo
              formik={formik}
            />

            {addressLoading.getAddressList ? (
              <LoadingCenter />
            ) : (
              <AddressInfo
                addressList={addressList}
                formikProps={formik}
              />
            )}

            <PaymentMethodList
              formikProps={formik}
            />

          </div>

        </div>
      </div>

      <FooterCartOrder
        cartData={cart}
        formikProps={formik}
      />

    </>
  );
};

export default CartPage;
