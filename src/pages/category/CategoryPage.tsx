import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import EmptyProducts from "@/components/EmptyProducts";
import { Product } from "@/models/Products";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!categoryName) {
      return;
    }
    const filtered = productsData.filter((product) => product.category_id === categoryName.toLowerCase());
    setFilteredProducts(filtered);
  }, [categoryName]);
  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, fromm chic dresses to versatitle accessories
        </p>
      </section>
      <div className="section__container">
        {filteredProducts?.length ? <ProductCards productsData={filteredProducts} /> : <EmptyProducts />}
      </div>
    </div>
  );
};

export default CategoryPage;
