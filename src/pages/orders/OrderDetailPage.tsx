import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import InfoUserCheckout from "../checkout/InfoUserCheckout";
import InfoOrderCheckout from "../checkout/InfoOrderCheckout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOrder } from "@/redux/order/order.thunk";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDateVN } from "@/utils/product";
import { ArrowLeftIcon, CircleIcon } from "lucide-react";
import { LoadingCenter } from "@/components/LoadingCenter";

const OrderDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { order, loading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!id) {
      return
    }
    dispatch(getOrder({ id }));

  }, [dispatch, id]);

  if (loading.getOrder) {
    return <LoadingCenter />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  const infoUserOrder = {
    name: order.customerName,
    email: order.customerEmail,
    phone: order.customerPhone,
    paymentMethod: order.payment?.paymentMethod || "",
    address: `${order.address}, ${order.wardName}, ${order.districtName}, ${order.provinceName}`,
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-col gap-10">
        <Button
          className="flex items-center gap-2 max-w-max"
          variant={"ghost"}
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
          <span className="uppercase">Back</span>
        </Button>

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="md:w-1/3">
            <InfoUserCheckout infoUserOrder={infoUserOrder} />
          </div>

          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Order status</h3>
            {order.orderStatusHistory.map((step, i) => (
              <div
                key={step.id}
                className="flex gap-2">

                <CircleIcon
                  fill={i === 0 ? 'black' : 'none'}
                  className="stroke-none"
                />

                <p>{formatDateVN(step.updatedAt)}</p>
                <p className="font-semibold uppercase">{step.status}</p>

              </div>
            ))}

            {order.trackingNumber &&
              <div>
                Tracking number: {order.trackingNumber}
              </div>
            }

            {order.payment?.status === "pending" &&
              <div className="flex flex-col gap-4 my-4">
                <p>Your order has not been paid yet</p>
                {order.payment.paymentUrl &&
                  <Button className="w-max">
                    <Link to={order.payment.paymentUrl}>Click here to pay {order.payment.paymentMethod}</Link>
                  </Button>
                }
              </div>
            }
          </div>

        </div>

        <div className="flex flex-col gap-4">
          <Button className="max-w-48">Need support</Button>
          <Button className="max-w-48">Buy back</Button>
        </div>

        <InfoOrderCheckout order={order} />
      </div>

    </div >
  );
};

export default OrderDetailPage;
