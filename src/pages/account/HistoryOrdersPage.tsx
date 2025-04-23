import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getOrders } from "@/redux/order/order.thunk";
import { formatPrice } from "@/utils/product";

const HistoryOrderPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])
  console.log(orders);

  return (
    <div>
      <div className="flex justify-between lg:items-center mb-10 flex-col lg:flex-row md:flex-row">
        <h2 className="text-2xl font-medium">History Order</h2>
        <Button className="lg:w-50 lg:h-12 h-10 mt-3">
          Policy payment within 60 days
        </Button>
      </div>

      <h4 className="text-lg font-medium py-10 border-t border-gray-200">My Order</h4>
      {orders.length >= 1 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            return (
              <div key={order.id} className=" rounded-lg overflow-hidden">
                <div className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
                  <div>
                    <span className="font-semibold">#{order.code}</span>
                    <span className="ml-3 text-sm">{new Date(order.orderDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</span>
                  </div>
                  {order.orderStatusHistory.find((history) => history.status === "cancelled") && (
                    <Badge variant="secondary" className="text-blue-600 bg-white text-sm">
                      Đã huỷ
                    </Badge>
                  )}
                </div>

                <div className="bg-gray-100 divide-y divide-gray-300">
                  {order.orderDetails.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 px-4 py-3">
                      <div className="aspect-[3/4]">
                        {/* <img src={item.} alt={item.name} className="object-cover rounded  w-27 h-23" /> */}
                      </div>
                      <div className="flex-1">
                        {/* <div className="font-medium">{item.name}</div> */}
                        <div className="text-sm text-muted-foreground">{item.variant}</div>
                        <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                      </div>
                      {/* <div className="font-medium whitespace-nowrap">{item.price.toLocaleString()}đ</div> */}
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center px-2 py-3 bg-gray-100 border-t border-gray-300">
                  <div className="flex gap-2">
                    <Button className="cursor-pointer border border-gray-300 hover:bg-gray-100">Cần hỗ trợ</Button>
                    <Button className="cursor-pointer border border-gray-300 hover:bg-gray-100">Mua lại</Button>
                  </div>
                  <div className="text-right text-base font-medium">{formatPrice(order.total)}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          Bạn chưa có đơn hàng nào tại{" "}
          <Link to="/" className="text__underline hover:text-blue-500 text-gray-900 text-md">
            Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default HistoryOrderPage;
