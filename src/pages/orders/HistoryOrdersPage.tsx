import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getListOrder } from "@/redux/order/order.thunk";
import { formatDateVN, formatPrice, getValidSortBy, getValidSortOrder } from "@/utils/product";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/Pagination";
import { SortByValue, SortOrderValue } from "@/types/response";

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
  }, [formState, dispatch, setSearchParams]);

  if (loading.getListOrder) {
    return <Skeleton className="h-4 w-[250px]" />
  }

  const updateFormState = (field: keyof SearchFormState, value: string | number) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage: number) => {
    updateFormState("page", newPage);
  };

  const totalPages = Math.ceil(totalCount / formState.limit);

  return (
    <div>
      <div className="flex justify-between lg:items-center mb-10 flex-col lg:flex-row md:flex-row">
        <h2 className="text-2xl font-medium">History Order</h2>
        <Button className="lg:w-50 lg:h-12 h-10 mt-3">
          Policy payment within 60 days
        </Button>
      </div>

      <div className="space-y-6">
        {list.length ?
          <div>
            {list.map((order) =>
              <div key={order.id} className="rounded-lg overflow-hidden">
                <Link to={`/get-order/${order.id}`}>
                  <div className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold">#{order.code}</span>
                      <span className="ml-3 text-sm">{formatDateVN(order.orderDate)}</span>
                    </div>
                    {order.orderStatusHistory.find(order => order.status === "confirmed") && (
                      <Badge variant="secondary" className="text-blue-600 bg-white text-sm capitalize">
                        Confirmed
                      </Badge>
                    )}
                  </div>

                  <div className="bg-gray-100 divide-y divide-gray-300">
                    {order.orderDetails.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 px-4 py-3">
                        <div className="w-16 h-16">
                          <img
                            src={item.product.thumbnail}
                            alt={item.product.name}
                            className="object-cover rounded w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.variant.variantValues.map((item) => `${item.option.name}: ${item.optionValue.valueName}`).join(" / ")}
                          </div>
                          <div className="text-sm text-muted-foreground">x{item.quantity}</div>
                        </div>
                        <div className="font-medium whitespace-nowrap">{formatPrice(item.totalPrice)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center px-2 py-3 bg-gray-100 border-t border-gray-300">
                    <div className="flex gap-2">
                      <Button className="cursor-pointer border">Cần hỗ trợ</Button>
                      <Button className="cursor-pointer border">Mua lại</Button>
                    </div>
                    <div className="text-right text-base font-medium">{formatPrice(order.total)}</div>
                  </div>
                </Link>
              </div>
            )}
            <Pagination
              currentPage={formState.page}
              totalPages={totalPages}
              totalCount={totalCount}
              limit={formState.limit}
              onPageChange={handlePageChange}
            />
          </div> :
          <div className="text-center py-10 text-muted-foreground">
            <p>Bạn chưa có đơn hàng nào tại</p>
            <Link to="/" className="text__underline hover:text-blue-500 text-gray-900 text-md">
              Shop
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default HistoryOrderPage;