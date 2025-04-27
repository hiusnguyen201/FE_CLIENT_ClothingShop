import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCards from "@/pages/shop/productDetails/ProductCards";
import productsData from "@/data/product.json";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TrendingProducts: React.FC = () => {
  const { slugName } = useParams<{ slugName: string }>();

  const formatSlug = (slugName: string) => {
    return slugName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displaySlugName = slugName ? formatSlug(slugName) : "All Product";

  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Số sản phẩm trên mỗi trang

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

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Kiểm tra trang hợp lệ
    setCurrentPage(page);
  };

  const buttonList = [
    { value: "all", label: "All Products" },
    { value: "newest", label: "New Product" },
    { value: "best-selling", label: "Best Seller" },
  ];

  return (
    <div>
      <section className="section__container product__container">
        <h1 className="text-gray-600 lg:text-3xl text-2xl ml-5 uppercase section__header">{displaySlugName}</h1>
        <div className="border-t border-gray-100 my-9"></div>
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

        {/* Hiển thị sản phẩm */}
        {currentItems && (
          <div className="mt-5">
            <ProductCards productsData={currentItems} />
          </div>
        )}

        {/* Phân trang */}
        <div className="mt-5 flex justify-center space-x-4">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="py-2 px-4 rounded-full border bg-white text-gray-800 hover:bg-gray-100"
          >
            Previous
          </Button>
          <span className="text-lg text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="py-2 px-4 rounded-full border bg-white text-gray-800 hover:bg-gray-100"
          >
            Next
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TrendingProducts;
