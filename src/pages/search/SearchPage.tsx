import React, { useEffect, useState } from "react";

// import productsData from "@/data/product.json";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { searchProducts } from "@/redux/search/search.thunk";
import { setPage } from "@/redux/search/search.slice";
import { useSearchParams } from "react-router-dom";
import ProductCards from "../shop/ProductDetails/ProductCards";

interface SearchFormState {
  keyword: string;
  category: string;
  sortBy: "name" | "createdAt";
  sortOrder: "asc" | "desc";
}

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { products, loading, totalCount, page, limit } = useAppSelector(
    state => state.searchProducts
  );

  const [formState, setFormState] = useState<SearchFormState>(() => {
    return {
      keyword: searchParams.get("keyword") || "",
      category: searchParams.get("category") || "",
      sortBy: (searchParams.get("sortBy") as "name" | "createdAt") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    };
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateFormState("keyword", event.currentTarget.value);
      getProducts();
    }
  };

  const getProducts = () => {
    dispatch(
      searchProducts({
        ...formState,
        category: formState.category || undefined,
        page,
        limit,
      })
    );
  }

  const updateFormState = (field: keyof SearchFormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (formState.keyword) params.set("keyword", formState.keyword);
    if (formState.category) params.set("category", formState.category);
    params.set("sortBy", formState.sortBy);
    params.set("sortOrder", formState.sortOrder);
    setSearchParams(params);

    dispatch(
      searchProducts({
        ...formState,
        category: formState.category || undefined,
        page,
        limit,
      })
    );
  }, [dispatch, page, limit, setSearchParams]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6 section__container">
      <h1 className="text-3xl font-bold">Sản phẩm</h1>
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={formState.keyword}
            onChange={(e) => updateFormState("keyword", e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded focus-visible:outline-none"
          />
          <button onClick={getProducts} className="w-full md:w-auto py-2 px-8 bg-red-500 text-white rounded">
            Search
          </button>
        </div>
        {loading.searchProducts ? <div className="text-center">Loading...</div>
          : <div>
            {products.length === 0 ? (
              <div>
                <p className="section__subheader">Sorry, no result found!</p>
              </div>
            ) : (
              <ProductCards productsData={products} />
            )}
          </div>}

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
    </div>
  );
};

export default SearchPage;
