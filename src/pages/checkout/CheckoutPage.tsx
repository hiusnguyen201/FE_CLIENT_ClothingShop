import React from "react";
import { useAppSelector } from "@/redux/store";
import { PAYMENT_METHODS } from "@/types/constant";
import { formatPrice } from "@/utils/product";
import CheckoutItem from "@/components/CheckoutItem";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotFoundPage from "@/components/NotFoundPage";

const CheckoutPage: React.FC = () => {
  const { orderCheckoutData } = useAppSelector((state) => state.order);

  if (!orderCheckoutData) {
    return <NotFoundPage />;
  }

  const paymentMethod = PAYMENT_METHODS.find((m) => m.method === orderCheckoutData.payment?.paymentMethod);

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-col gap-6">
          <div className="md:px-48 text-center space-y-6">
            <h1 className="uppercase font-bold text-3xl">Order successfull!</h1>

            <p className="">
              There are so many choices on the market, thank you for choosing to shop at Coolmate.me Your order has
              CERTAINLY been transferred to Coolmate's order processing system. During the processing, Coolmate will
              contact you if we need more information from you. In addition, Coolmate will also send order confirmation
              by Email and SMS
            </p>

            <Button className="rounded-full md:px-10 py-6 text-base">
              <Link to={"/"}>Explore more products here</Link>
            </Button>
          </div>

          <div className="space-y-4">
            <div className="uppercase text-center md:text-2xl font-bold">Order details #{orderCheckoutData.id}</div>

            <div>
              <div className="grid grid-cols-4 gap-4 p-3 rounded-t-lg bg-black">
                <div className="text-white font-bold">Product</div>
                <div className="text-center text-white font-bold">Quantity</div>
                <div className="text-center text-white font-bold">Price</div>
                <div className="text-end text-white font-bold">Sum price</div>
              </div>

              {orderCheckoutData?.orderDetails.map((item) => (
                <CheckoutItem key={item.id} item={item} />
              ))}

              <div className="grid grid-cols-2 divide-y">
                <div className="col-span-2 grid grid-cols-2 p-4">
                  <div>Total product price</div>
                  <div className="text-right">{formatPrice(orderCheckoutData?.subTotal)}</div>
                </div>

                <div className="col-span-2 grid grid-cols-2 p-4">
                  <div>Discount</div>
                  <div className="text-right">{formatPrice(0)}</div>
                </div>

                <div className="col-span-2 grid grid-cols-2 p-4">
                  <div>Shipping</div>
                  <div className="text-right">{formatPrice(orderCheckoutData?.shippingFee)}</div>
                </div>

                <div className="col-span-2 grid grid-cols-2 p-4 bg-black rounded-b-lg">
                  <div className="text-white font-bold">Total</div>
                  <div className="text-right text-white font-bold">{formatPrice(orderCheckoutData?.total)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="uppercase text-center text-2xl font-bold">Delivery information</div>
            <div className="px-4 py-4 border rounded-lg bg-neutral-200">
              <div className="space-y-4">
                <div>
                  <div className="text-neutral-600">Recipient name:</div>
                  <div>{orderCheckoutData?.customerName}</div>
                </div>

                <div>
                  <div className="text-neutral-600">Email:</div>
                  <div>{orderCheckoutData?.customerEmail}</div>
                </div>

                <div>
                  <div className="text-neutral-600">Phone:</div>
                  <div>{orderCheckoutData?.customerPhone}</div>
                </div>

                <div>
                  <div className="text-neutral-600">Payment method:</div>
                  <div>{paymentMethod?.label}</div>
                </div>

                <div>
                  <div className="text-neutral-600">Shipping address:</div>
                  <div>
                    {[
                      orderCheckoutData.address,
                      orderCheckoutData.wardName,
                      orderCheckoutData.districtName,
                      orderCheckoutData.provinceName,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
