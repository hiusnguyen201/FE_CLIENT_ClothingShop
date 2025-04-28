import React, { Suspense, useEffect } from "react";
import ProductCards from "@/pages/shop/ProductDetails/ProductCards";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { getListProduct } from "@/redux/product/product.thunk";

const TrendingProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getListProduct({
        limit: 10,
        sortBy: "createdAt"
      })
    );
  }, [dispatch]);


  return (
    <Suspense fallback={<Skeleton />}>
      <section className="section__container product__container">
        <h1 className="text-gray-600 lg:text-3xl text-2xl ml-5 uppercase section__header">{displaySlugName}</h1>
        <div className="border-t border-gray-100 my-9"></div>
        <div className="flex justify-between">
          <div className="flex">
            <Button className="text-white bg-gray-900 text-sm lg:text-lg py-2 px-2 md:px-5 md:py-5 rounded-3xl">
              New Product <i className="ri-star-line"></i>
            </Button>
            <Button className="text-gray-900 bg-white hover:bg-gray-100 ml-4 text-sm lg:text-lg py-2 px-2 md:px-5 md:py-5 rounded-3xl border border-gray-900">
              Best Seller
            </Button>
          </div>
          <Link to="/search" className="text-gray-500 bg-white hover:text-gray-900 text__underline ml-4 text-lg p-3">
            See More
          </Link>
        </div>
        {/* product card */}
        {
          list && (
            <div className="mt-5">
              <ProductCards productsData={list} />
            </div>
          )}
      </section>
    </Suspense >
  );
};

export default TrendingProducts;
