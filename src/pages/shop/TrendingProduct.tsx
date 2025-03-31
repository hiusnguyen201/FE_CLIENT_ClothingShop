import React, { useState } from "react";
import ProductCards from "@/pages/shop/ProductCards";

import productsData from "@/data/product.json";

const TrendingProducts: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState<number>(8);

  // Hàm load thêm sản phẩm
  const handleLoadMoreProduct = () => {
    setVisibleProducts((prevCount) => prevCount + 8);
  };

  // Hàm ẩn sản phẩm (reset lại về 8 sản phẩm ban đầu)
  const handleHideProducts = () => {
    setVisibleProducts(8);
  };
  return (
    <div>
      <section className="section__container product__container">
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader mb-12">
          Explore Clothing Shop in Vietnam
        </p>
        {/* product card */}
        {productsData && (
          <div className="mt-12">
            <ProductCards
              productsData={productsData.slice(0, visibleProducts)}
            />
          </div>
        )}

        {/* load more product btn */}
        <div className="product__btn">
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
        </div>
      </section>
    </div>
  );
};

export default TrendingProducts;
