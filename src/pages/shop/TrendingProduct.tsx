import React, { Suspense, useEffect } from "react";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";

// import productsData from "@/data/product.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { searchProducts } from "@/redux/search/search.thunk";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(
    state => state.searchProducts
  );

  useEffect(() => {
    dispatch(
      searchProducts({
        limit: 10,
        sortBy: "createdAt"
      })
    );
  }, [dispatch]);


  return (
    <Suspense fallback={<Skeleton />}>
      <section className="section__container product__container">
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader ">Explore Clothing Shop in Vietnam</p>
        <div className="flex justify-between">
          <div className="flex">
            <Button className="text-white bg-gray-900 text-sm lg:text-lg py-2 px-2 md:px-5 md:py-5 rounded-4xl">
              New Product <i className="ri-star-line"></i>
            </Button>
            <Button className="text-gray-900 bg-white hover:bg-gray-100 ml-4 text-sm lg:text-lg py-2 px-2 md:px-5 md:py-5 rounded-4xl border border-gray-900">
              Best Seller
            </Button>
          </div>
          <Link to="/shop" className="text-gray-500 bg-white hover:text-gray-900 text__underline ml-4 text-lg p-3">
            See More
          </Link>
        </div>
        {/* product card */}
        {products && (
          <div className="mt-5">
            <ProductCards productsData={products} />
          </div>
        )}
      </section>
    </Suspense>
  );
};

export default TrendingProducts;
