import React, { useState } from "react";

import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import { Product } from "@/models/Products";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const handleSearch = () => {
    //get search query
    const query = searchQuery.toLowerCase();
    //filter product
    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) || product.short_description.toLowerCase().includes(query) || false
    );
    //setFillerProducts
    setFilteredProducts(filtered);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (event.key === "Enter") {
      handleSearch();
    }
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded focus-visible:outline-none"
          />
          <button onClick={handleSearch} className="w-full md:w-auto py-2 px-8 bg-red-500 text-white rounded">
            Search
          </button>
        </div>
        <div>
          {filteredProducts.length === 0 ? (
            <div>
              <p className="section__subheader">Sorry, no result found!</p>
            </div>
          ) : (
            <ProductCards productsData={filteredProducts} />
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
