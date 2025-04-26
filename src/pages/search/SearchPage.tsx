import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSearchParams } from "react-router-dom";
import ProductCards from "../shop/ProductDetails/ProductCards";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { SortByValue, SortOrderValue } from "@/types/response";
import { getListProduct } from "@/redux/product/product.thunk";
import Pagination from "@/components/Pagination";
import { getValidSortBy, getValidSortOrder } from "@/utils/product";

interface SearchFormState {
  page: number;
  limit: number;
  keyword?: string;
  category?: string;
  sortBy?: SortByValue;
  sortOrder?: SortOrderValue;
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { list: productList, loading, totalCount } = useAppSelector((state) => state.product);
  const { list: categoryList } = useAppSelector((state) => state.categories);

  const [formState, setFormState] = useState<SearchFormState>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      keyword: searchParams.get("keyword") || undefined,
      category: searchParams.get("category") || undefined,
      sortBy: getValidSortBy(searchParams.get("sortBy")),
      sortOrder: getValidSortOrder(searchParams.get("sortOrder")),
    };
  });

  const debouncedKeyword = useDebounce(formState.keyword, 700);

  const updateFormState = (field: keyof SearchFormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage: number) => {
    updateFormState("page", newPage);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedKeyword) params.set("keyword", debouncedKeyword);
    if (formState.category) params.set("category", formState.category);
    if (formState.sortBy) params.set("sortBy", formState.sortBy);
    if (formState.sortOrder) params.set("sortOrder", formState.sortOrder);
    if (formState.page) params.set("page", formState.page.toString());
    if (formState.limit) params.set("limit", formState.limit.toString());

    setSearchParams(params);

    dispatch(
      getListProduct({
        ...formState,
        keyword: debouncedKeyword,
        category: formState.category,
        sortBy: formState?.sortBy || null,
        sortOrder: formState.sortOrder,
        limit: formState.limit,
        page: formState.page,
      })
    );
  }, [
    debouncedKeyword,
    formState.category,
    formState.sortBy,
    formState.sortOrder,
    formState.page,
    formState.limit,
    dispatch,
    setSearchParams,
  ]);

  const totalPages = Math.ceil(totalCount / formState.limit);

  return (
    <div className="space-y-6 section__container">
      <h1 className="text-3xl font-bold">Sản phẩm</h1>
      <section className="section__container">
        <div className="mb-12 w-full flex flex-col justify-between md:flex-row gap-4 lg:w-120">
          <div>
            <Input
              type="text"
              value={formState.keyword}
              onChange={(e) => updateFormState("keyword", e.target.value)}
              placeholder="Search for products..."
              className="w-80 border-gray-500 rounded-md focus-visible:outline-none p-5"
            />
          </div>
          <Select onValueChange={(value) => updateFormState("category", value)}>
            <SelectTrigger className="w-52 p-5 border-gray-500">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              {categoryList.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-gray-700 mb-10">Kết quả</h2>
        <div>
          {loading.getListProduct ? (
            <Skeleton className="h-8 w-[250px]" />
          ) : productList.length === 0 ? (
            <div>
              <p className="section__subheader">Sorry, no result found!</p>
              {/* <h4 className="text-lg font-normal">Other products</h4> */}
            </div>
          ) : (
            <>
              <ProductCards productsData={productList} />

              <Pagination
                currentPage={formState.page}
                totalPages={totalPages}
                totalCount={totalCount}
                limit={formState.limit}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
