import React from "react";
import { Order } from "@/types/order";
import { formatPrice } from "@/utils/product";
import { Link } from "react-router-dom";

interface InfoOrderCheckoutProps {
  order: Order;
}

const InfoOrderCheckout: React.FC<InfoOrderCheckoutProps> = ({ order }) => {

  return (
    <div className=" bg-gray-100">
      <h2 className="text-center text-2xl font-bold m-4 ">Order information</h2>

      {/* Product List */}
      {order?.orderDetails?.map((detail) => (
        <Link key={detail?.id} to={`/product/${detail?.product?.slug}`}>
          <div className="flex gap-4 justify-between p-4 border-t">
            <div className="flex gap-4">
              <img
                src={detail?.product?.thumbnail}
                alt={detail?.product?.name}
                className="w-20 h-20 object-cover rounded border" />
              <div>
                <div>{detail?.product?.name}</div>
                <div className="">
                  {detail?.variant?.variantValues
                    .map((variant) => `${variant.option.name}: ${variant.optionValue.valueName}`)
                    .join(" / ")}
                </div>
                <div>x{detail?.quantity}</div>
              </div>
            </div>

            <div className="flex items-center">
              <span>{formatPrice(detail?.unitPrice)}</span>
            </div>

          </div>
        </Link>
      ))}

      <div>

        <div className="flex justify-end items-center border border-dashed">
          <div className="p-3">Total product value</div>
          <div className="min-w-48 py-3 px-4 border-l border-dashed text-end">{formatPrice(order?.subTotal)}</div>
        </div>

        <div className="flex justify-end items-center border border-dashed">
          <div className="p-3">Shipping Fee</div>
          <div className="min-w-48 py-3 px-4 border-l border-dashed text-end">{formatPrice(order?.shippingFee)}</div>
        </div>

        <div className="flex justify-end items-center border border-dashed">
          <div className="p-3">Total payment</div>
          <div className="min-w-48 py-3 px-4 border-l border-dashed text-end">{formatPrice(order?.total)}</div>
        </div>

      </div>

    </div>
  );
};

export default InfoOrderCheckout;
