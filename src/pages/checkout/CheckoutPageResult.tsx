import React from "react";
import { formatPrice } from "@/utils/product";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NotFoundPage from "@/components/NotFoundPage";

const CheckoutPageResult: React.FC = () => {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const resultCode = Number(searchParams.get("resultCode"));
  const amount = Number(searchParams.get("amount"));

  if (!orderId) {
    return <NotFoundPage />;
  }

  if (resultCode != 0) {
    return <div>Order canceled</div>;
  }
  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="flex flex-col gap-6">
          <div className="md:px-48 text-center space-y-6">
            <h1 className="uppercase font-bold text-3xl">Order successfull!</h1>

            <p>
              There are so many choices on the market, thank you for choosing to shop at Coolmate.me Your order has
              CERTAINLY been transferred to Coolmate's order processing system. During the processing, Coolmate will
              contact you if we need more information from you. In addition, Coolmate will also send order confirmation
              by Email and SMS
            </p>

            <Button className="rounded-full md:px-10 py-6 text-base">
              <Link to={"/"}>Explore more products here</Link>
            </Button>
          </div>

          <div className="space-y-4 text-center">
            <div className="uppercase font-bold text-lg">Order #{orderId}</div>
            <div>You have successfully paid {amount ? formatPrice(amount) : null} for the order</div>

            <Button>
              <Link to={`/get-order/${orderId}`}>Click here to go order details</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPageResult;
