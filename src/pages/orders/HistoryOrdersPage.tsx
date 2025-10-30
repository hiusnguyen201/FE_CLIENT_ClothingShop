import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getListOrder } from "@/redux/order/order.thunk";
import { formatDateVN, formatPrice, getValidSortBy, getValidSortOrder } from "@/utils/product";
import Pagination from "@/components/Pagination";
import { SortByValue, SortOrderValue } from "@/types/response";
import { Separator } from "@/components/ui/separator";
import { LoadingCenter } from "@/components/LoadingCenter";

interface SearchFormState {
  page: number;
  limit: number;
  sortBy?: SortByValue;
  sortOrder?: SortOrderValue;
}

const HistoryOrderPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, totalCount } = useAppSelector((state) => state.order);
  const [searchParams, setSearchParams] = useSearchParams();

  const [formState, setFormState] = useState<SearchFormState>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: getValidSortBy(searchParams.get("sortBy")),
      sortOrder: getValidSortOrder(searchParams.get("sortOrder")),
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("tab", "orders");
    if (formState.sortBy) params.set("sortBy", formState.sortBy);
    if (formState.sortOrder) params.set("sortOrder", formState.sortOrder);
    if (formState.page) params.set("page", formState.page.toString());
    if (formState.limit) params.set("limit", formState.limit.toString());

    setSearchParams(params);

    dispatch(
      getListOrder({
        ...formState,
        sortBy: formState.sortBy,
        sortOrder: formState.sortOrder,
        limit: formState.limit,
        page: formState.page,
      })
    );
  }, [formState, dispatch]);

  const updateFormState = (field: keyof SearchFormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage: number) => {
    updateFormState("page", newPage);
  };

  const totalPages = Math.ceil(totalCount / formState.limit);

  return (
    <>
      <h2 className="text-2xl font-medium text-center md:text-left mb-2">History Order</h2>

      {loading.getListOrder ? (
        <LoadingCenter />
      ) : list.length ? (
        <div className="flex flex-col gap-4">
          {list.map((order) => (
            <div key={order.id} className="border rounded-lg bg-slate-100">
              <div className="bg-blue-500 text-white py-2 px-4 flex items-center justify-between rounded-t-lg">
                <p>
                  <span className="font-semibold">#{order.code}</span>
                  <span className="m-2 text-sm">{formatDateVN(order.orderDate)}</span>
                </p>
                <p className="uppercase">{order.orderStatusHistory[order.orderStatusHistory.length - 1].status}</p>
              </div>

              <Link to={`/get-order/${order.id}`} className="flex flex-col py-2 px-4 gap-2">
                {order.orderDetails.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-4">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="object-cover rounded w-20 h-20"
                        />

                        <div className="flex flex-col">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {/* {item.variant.variantValues
                              .map((item) => `${item.option.name}: ${item.optionValue.valueName}`)
                              .join(" / ")} */}
                          </div>
                          <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                        </div>
                      </div>

                      <div className="font-medium">{formatPrice(item.totalPrice)}</div>
                    </div>
                    <Separator orientation="horizontal" />
                  </div>
                ))}
              </Link>

              <div className="flex justify-between items-center py-2 px-4">
                <Button>Help</Button>
                <div className="font-medium">Total: {formatPrice(order.total)}</div>
              </div>
            </div>
          ))}

          <Pagination
            currentPage={formState.page}
            totalPages={totalPages}
            totalCount={totalCount}
            limit={formState.limit}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">Order is empty</div>
      )}
    </>
  );
};

export default HistoryOrderPage;
