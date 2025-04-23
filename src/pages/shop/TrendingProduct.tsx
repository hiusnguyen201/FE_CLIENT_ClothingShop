import React, { useState } from "react";
import ProductCards from "@/pages/shop/productDetails/ProductCards";

import productsData from "@/data/product.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TrendingProducts: React.FC = () => {
  const [sortBy, setSortBy] = useState<"newest" | "best-selling">("newest");

  const sortedProducts = [...productsData].sort((a, b) => {
    if (sortBy === "best-selling") {
      return (b.total_sold || 0) - (a.total_sold || 0);
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div>
      <section className="section__container product__container">
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader ">Explore Clothing Shop in Vietnam</p>
        <div className="flex justify-between">
          <div className="flex">
            <Button
              onClick={() => setSortBy("newest")}
              className={cn(
                "text-sm lg:text-lg py-2 px-4 md:px-5 md:py-3 rounded-4xl border",
                sortBy === "newest" ? "bg-gray-800 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
              )}
            >
              New Product <i className="ri-star-line"></i>
            </Button>

            <Button
              onClick={() => setSortBy("best-selling")}
              className={cn(
                "ml-4 border border-gray-900 text-sm lg:text-lg py-2 px-4 md:px-5 md:py-3 rounded-4xl",
                sortBy === "best-selling" ? "bg-gray-800 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
              )}
            >
              Best Seller
            </Button>
          </div>
          <Link to="/shop" className="text-gray-500 bg-white hover:text-gray-900 text__underline ml-4 text-lg p-3">
            See More
          </Link>
        </div>
        {/* product card */}
        {sortedProducts && (
          <div className="mt-5">
            <ProductCards productsData={sortedProducts.slice(0, 8)} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TrendingProducts;
