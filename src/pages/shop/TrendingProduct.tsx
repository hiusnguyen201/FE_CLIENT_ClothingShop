import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCards from "@/pages/shop/productDetails/ProductCards";
import productsData from "@/data/product.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface props {
  slugName?: string;
}

const TrendingProducts: React.FC<props> = ({ slugName }) => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("all");

  const validSlugs = ["all", "newest", "best-selling"];

  useEffect(() => {
    if (slugName) {
      if (validSlugs.includes(slugName)) {
        setSortBy(slugName);
      } else {
        navigate("/not-found");
      }
    } else {
      setSortBy("all");
    }
  }, [slugName, navigate]);

  const sortedProducts = [...productsData]
    .filter(() => {
      if (sortBy === "all") return true;
      return true; // newest và best-selling đều cần lấy toàn bộ để sort lại
    })
    .sort((a, b) => {
      if (sortBy === "best-selling") {
        return (b.total_sold || 0) - (a.total_sold || 0);
      }
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  const buttonList = [
    { value: "all", label: "All Products" },
    { value: "newest", label: "New Product" },
    { value: "best-selling", label: "Best Seller" },
  ];

  return (
    <div>
      <section className="section__container product__container">
        <div className=" border-t border-gray-100 my-9"></div>
        <div className="flex justify-between">
          <div className="flex items-center">
            {buttonList.map((button) => (
              <Button
                key={button.value}
                onClick={() => setSortBy(button.value)}
                className={cn(
                  "ml-4 first:ml-0 text-sm lg:text-lg py-2 px-4 md:px-5 md:py-3 rounded-4xl border",
                  sortBy === button.value ? "bg-gray-800 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
                )}
              >
                {button.label}
              </Button>
            ))}
          </div>

          <Link
            to="/shop"
            className="text-gray-500 bg-white hover:text-gray-900 text__underline ml-4 text-lg p-3 hidden md:flex"
          >
            See More
          </Link>
        </div>

        {sortedProducts && (
          <div className="mt-5">
            <ProductCards productsData={sortedProducts.slice(0, 10)} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TrendingProducts;
