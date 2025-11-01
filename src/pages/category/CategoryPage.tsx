import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategory } from "@/redux/category/category.thunk";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import Pagination from "@/components/Pagination";
import { getListProduct } from "@/redux/product/product.thunk";
import { SortByValue, SortOrderValue } from "@/types/response";
import { getValidSortBy, getValidSortOrder } from "@/utils/product";
import { LoadingCenter } from "@/components/LoadingCenter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface SearchFormState {
  page: number;
  limit: number;
  sortBy?: SortByValue;
  sortOrder?: SortOrderValue;
}

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { category, loading: categoryLoading } = useAppSelector((state) => state.categories);
  const { list, loading: productLoading, totalCount } = useAppSelector((state) => state.product);

  // const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  // const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("newest");
  // const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [formState, setFormState] = useState<SearchFormState>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      sortBy: getValidSortBy(searchParams.get("sortBy")),
      sortOrder: getValidSortOrder(searchParams.get("sortOrder")),
    };
  });

  useEffect(() => {
    if (!slug) return;
    dispatch(getCategory({ id: slug }));
  }, [slug]);

  useEffect(() => {
    if (!category?.id) return;

    const params = new URLSearchParams();
    if (formState.sortBy) params.set("sortBy", formState.sortBy);
    if (formState.sortOrder) params.set("sortOrder", formState.sortOrder);
    if (formState.page) params.set("page", formState.page.toString());
    if (formState.limit) params.set("limit", formState.limit.toString());

    setSearchParams(params);

    dispatch(
      getListProduct({
        ...formState,
        category: category.id,
      })
    );
  }, [formState, category?.id]);

  if (!category && !categoryLoading.getCategory) {
    navigate("/404", { replace: true });
    return;
  }

  const updateFormState = (field: keyof SearchFormState, value: string | number) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (newPage: number) => {
    updateFormState("page", newPage);
  };

  const totalPages = Math.ceil(totalCount / formState.limit);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="flex flex-col md:flex-row">
        {/* Main Product */}
        <div className="w-full space-y-4">
          <Breadcrumb className="p-0 m-0">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${category?.slug}`}>{category?.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {totalCount} {category?.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="uppercase text-2xl font-bold border-b">{category?.name}</h1>

          <div className="flex justify-between items-center ">
            <p className="text-sm font-bold">{list.length} result</p>

            <div className="flex items-center gap-2 ">
              <div className="text-sm">Sort By</div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {productLoading.getListProduct || categoryLoading.getCategory ? (
            <LoadingCenter />
          ) : (
            <>
              {list.length && (
                <>
                  <ProductCards productsData={list} />

                  <Pagination
                    currentPage={formState.page}
                    totalPages={totalPages}
                    totalCount={totalCount}
                    limit={formState.limit}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
