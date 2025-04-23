import React, { useEffect, useState } from "react";

// import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import EmptyProducts from "@/components/EmptyProducts";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { searchProducts } from "@/redux/search/search.thunk";
import { setPage } from "@/redux/search/search.slice";
import { GetListParams } from "@/types/response";

interface DataItem {
  name: string;
  createdAt: string;
}

interface ExtendedGetListParams<TData> extends GetListParams<TData> {
  category?: string | undefined;
}

const ShopPage: React.FC = () => {
  // const [products] = useState(productsData);
  const [isDropdownMenuSort, setIsDropdownMenuSort] = useState<boolean>(false);
  const [selected, setSelected] = useState("New Product");

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, loading, totalCount, page, limit } = useAppSelector(
    state => state.searchProducts
  );
  const { categories } = useAppSelector(
    state => state.categories
  );

  const [formState, setFormState] = useState<ExtendedGetListParams<DataItem>>(() => {
    return {
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      keyword: searchParams.get("keyword") || "",
      category: searchParams.get("category") || "",
      sortBy: (searchParams.get("sortBy") as "name" | "createdAt" | undefined) || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc" | undefined) || "desc",
    };
  });

  const handleToggleDropdownSort = () => {
    setIsDropdownMenuSort(!isDropdownMenuSort);
  };

  const handleSelectSort = (option: { name: string, value: string }) => {
    setSelected(option.name);
    updateFormState("sortBy", option.value);
    setIsDropdownMenuSort(false);
  };

  const updateFormState = (field: keyof SearchFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (formState.keyword) params.set("keyword", formState.keyword);
    if (formState.category) params.set("category", formState.category);
    params.set("sortBy", formState.sortBy);
    params.set("sortOrder", formState.sortOrder);
    if (formState.limit) params.set("limit", formState.limit);
    setSearchParams(params);

    dispatch(
      searchProducts({
        ...formState,
        category: formState.category || undefined,
        page,
        limit,
      })
    );
  }, [dispatch, formState, page, limit, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  // const handleLimitChange = (newLimit: number) => {
  //   dispatch(setLimit(newLimit));
  // };

  const totalPages = Math.ceil(totalCount / limit);

  const sortBy = [{
    name: "New Product",
    value: "createdAt"
  },
  {
    name: "Best Seller",
    value: "createdAt"
  },
  {
    name: "Low to high price",
    value: "createdAt"
  },
  {
    name: "High to low price",
    value: "highToLowPrice"
  }]

  return (
    <div>
      <section className="section__container">
        <img
          src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
          alt=""
        />
      </section>
      <section className="section__container">
        <div className="flex flex-col gap-8">
          {/* right side */}

          <div>
            <h1 className="text-4xl text-gray-800">New Product</h1>
            <div className="flex space-x-3 py-3 border-b border-gray-100 mb-5">
              {categories.map((category, i) => (
                <Button
                  key={i}
                  onClick={() => updateFormState("category", category.id)}
                  className={`text-gray-900 text-xl w-32 h-15 rounded-4xl cursor-pointer
                   ${formState.category === category.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="flex justify-between">
              <h3 className="text-md font-medium">Product Available : {totalCount}</h3>
              <div className="flex text-md text-gray-500">
                <span className="items-center p-3 mr-3">Sort By</span>
                <div className="relative inline-block text-left">
                  <div
                    onClick={handleToggleDropdownSort}
                    className="flex items-center justify-between w-50 h-13 px-3 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                  >
                    <span>{selected}</span>
                    <i
                      className={`ri-arrow-down-s-line transition-transform duration-300 ${isDropdownMenuSort ? "rotate-180" : ""
                        }`}
                    ></i>
                  </div>

                  {isDropdownMenuSort && (
                    <div className="absolute z-10 w-56 origin-top-right rounded-2xl bg-white shadow-xl transition-all duration-300">
                      <ul className="py-2 text-md">
                        {sortBy.map((option, index) => (
                          <li
                            key={index}
                            onClick={() => handleSelectSort(option)}
                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.name === selected ? "bg-gray-100" : ""
                              }`}
                          >
                            {option.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {loading.searchProducts ?
              <div className="text-center py-4">Loading...</div>
              : products.length === 0 ?
                <EmptyProducts />
                : <div className="mt-12">
                  <ProductCards productsData={products} />
                </div>
            }

          </div>
        </div>
        {/* load more product btn */}
        {/* <div className="product__btn">
          {visibleProducts < productsData.length && (
            <button className="btn" onClick={handleLoadMoreProduct}>
              Load More
            </button>
          )}
          {visibleProducts > productsData.length && (
            <button className="btn" onClick={handleHideProducts}>
              Hide Products
            </button>
          )}
        </div> */}
        <div className="flex items-center justify-between bg-white px-4 mt-2 sm:px-6">
          <div className="flex flex-1 justify-between ">
            <p className="text-sm text-gray-500 text-center lg:block">
              Showing {Math.min((page - 1) * limit + 1, totalCount)}-{Math.min(page * limit, totalCount)} of {totalCount} products
            </p>
          </div>
          <div className="lg:items-center bg-white">
            <nav className="isolate inline-flex -space-x-px rounded-md " aria-label="Pagination">
              <button
                onClick={() => handlePageChange(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <i className="ri-arrow-left-s-line text-sm"></i>
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    } focus:z-20 focus:outline-offset-0`}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <i className="ri-arrow-right-s-line text-sm"></i>
              </button>
            </nav>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 section__container">
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ShopPage;
