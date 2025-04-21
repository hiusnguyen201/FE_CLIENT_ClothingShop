import React, { useEffect, useState } from "react";

// import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { searchProducts } from "@/redux/search/search.thunk";
import { setLimit, setPage } from "@/redux/search/search.slice";
import { useSearchParams } from "react-router-dom";

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

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, fromm chic dresses to versatitle accessories
        </p>
      </section>
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

      </section>
    </div>
  );
};

export default SearchPage;
