import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import InfoUserCheckout from "../checkout/InfoUserCheckout";
import InfoOrderCheckout from "../checkout/InfoOrderCheckout";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOrder } from "@/redux/order/order.thunk";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateVN } from "@/utils/product";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { order, loading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) {
      return
    }
    dispatch(getOrder({ id }));

  }, [dispatch, id]);

  if (loading.getOrder) {
    return <Skeleton className="h-8 w-[250px]" />;
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
    <div className="max-w-4xl px-4">
      <div className="flex items-center gap-2">
        <h2 className="lg:text-2xl text-xl font-semibold mb-2">
          Information Order
        </h2>
        <span className="text-blue-600">#{order.id}</span>
      </div>

      <div>
        <InfoUserCheckout infoUserOrder={infoUserOrder} />
      </div>

      <div className="flex gap-4 mb-10 mx-5">
        <Button className="">Need support</Button>
        <Button className="">Buy back</Button>
      </div>

      <h3 className="text-xl font-semibold mb-4">Order status</h3>
      <div className="relative border-l-2 border-gray-300 pl-4 space-y-6 mb-10">
        {order.orderStatusHistory.map((step, i) => (
          <div key={step.id} className="relative pl-6">
            <div className={`absolute -left-3 top-1 w-3 h-3 rounded-full 
            ${i === order.orderStatusHistory.length - 1 ? "bg-blue-500" : "bg-gray-500"}`}>
            </div>
            <div className="font-semibold">{step.status}</div>
            <div className="text-xs text-gray-500">{formatDateVN(step.updatedAt)}</div>
          </div>
        ))}
      </div>

      {order.trackingNumber && <div>
        Tracking number: {order.trackingNumber}
      </div>
      }

      {order.payment?.status === "pending" && <div>
        {order.payment.paymentUrl && <Button>
          <Link to={order.payment.paymentUrl}>Click here to pay with {order.payment.paymentMethod}</Link>
        </Button>
        }
        {order.payment.qrCodeUrl &&
          <div className="flex flex-col items-center">
            <p className="mb-2">Scan QR to pay</p>
            <img
              className="max-w-full h-auto w-48 md:w-64 lg:w-80"
              src={order.payment.qrCodeUrl}
              alt="QR Code"
            />
          </div>
        }
      </div>
      }

      <h3 className="text-xl font-semibold mb-4">Order Product Details</h3>
      <div>
        <InfoOrderCheckout order={order} />
      </div>
    </div>
  );
};

export default OrderDetailPage;
