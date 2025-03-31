import React, { useEffect, useState } from "react";

import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductCards";
import ShopFiltering from "@/pages/shop/ShopFiltering";
import EmptyProducts from "@/components/EmptyProducts";

const filters = {
  category: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  color: ["all", "black", "red", "blue", "gold", "silver", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState(productsData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRanges: "",
  });

  // filtering function
  const applyFilters = () => {
    let filteredProducts = productsData;

    //filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (products) => products.category_id === filtersState.category
      );
    }

    //filter by color
    if (filtersState.color && filtersState.color !== "all") {
      filteredProducts = filteredProducts.filter(
        (products) => products.color === filtersState.color
      );
    }

    //filter by price range
    if (filtersState.priceRanges) {
      const [minPrice, maxPrice] = filtersState.priceRanges
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter(
        (products) => products.price >= minPrice && products.price <= maxPrice
      );
    }
    setProducts(filteredProducts);
  };
  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  //clear the filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRanges: "",
    });
  };
  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, fromm chic dresses to versatitle
          accessories
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* left side */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          {/* right side */}
          {products?.length === 0 ? (
            <EmptyProducts />
          ) : (
            <div>
              <h3 className="text-xl font-medium mb-4">
                Product Available : {products.length}
              </h3>
              <ProductCards productsData={products} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
