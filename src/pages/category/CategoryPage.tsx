import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import EmptyProducts from "@/components/EmptyProducts";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getCategory } from "@/redux/category/category.thunk";
import { searchProducts } from "@/redux/search/search.thunk";
import { Product } from "@/types/product";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const dispatch = useAppDispatch();
  const { category, loading: categoryLoading } = useAppSelector((state) => state.categories);
  const { products, loading: productsLoading } = useAppSelector((state) => state.searchProducts);

  useEffect(() => {
    if (!categoryId) {
      setFilteredProducts([]);
      return;
    }
    dispatch(getCategory(categoryId));
  }, [dispatch, categoryId]);

  useEffect(() => {
    if (!category) {
      setFilteredProducts([]);
      return;
    }
    dispatch(searchProducts({ category: category.id }));
  }, [dispatch, category]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">{category?.name}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, fromm chic dresses to versatitle accessories
        </p>
      </section>
      <div className="section__container">
        {filteredProducts.length ? <ProductCards productsData={filteredProducts} /> : <EmptyProducts />}
      </div>
    </div>
  );
};

export default CategoryPage;
