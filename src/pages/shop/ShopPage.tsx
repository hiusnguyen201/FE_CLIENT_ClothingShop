import React, { useState } from "react";

import productsData from "@/data/product.json";
import ProductCards from "@/pages/shop/productDetails/ProductCards";
import EmptyProducts from "@/components/EmptyProducts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ShopPage: React.FC = () => {
  const [products] = useState(productsData);
  const [visibleProducts, setVisibleProducts] = useState<number>(8);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isDropdownMenuSort, setIsDropdownMenuSort] = useState<boolean>(false);
  const [selected, setSelected] = useState("New Product");

  const handleToggleDropdownSort = () => {
    setIsDropdownMenuSort(!isDropdownMenuSort);
  };

  const handleSelectSort = (option: string) => {
    setSelected(option);
    setIsDropdownMenuSort(false);
  };

  const handleLoadMoreProduct = () => {
    setVisibleProducts((prevCount) => prevCount + 8);
  };
  const handleHideProducts = () => {
    setVisibleProducts(8);
  };

  const categoriesName = ["All", "Shirt", "Trousers", "Accessory"];
  const sortBy = ["New product", "Best seller", "Low to high price", "High to low price", "% biggest discount"];

  return (
    <div>
      <section className="section__container">
        <img
          src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
          alt=""
        />
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* right side */}
          {products?.length === 0 ? (
            <EmptyProducts />
          ) : (
            <div>
              <h1 className="text-4xl text-gray-800">New Product</h1>
              <div className="flex space-x-3 py-3 border-b border-gray-100 mb-5">
                {categoriesName.map((category, i) => (
                  <Button
                    key={i}
                    onClick={() => setActiveCategory(category)}
                    className={`text-gray-900 text-sm w-20 h-10 sm:w-28 sm:h-12 sm:text-lg md:w-32 md:h-14 md:text-xl rounded-4xl 
                     ${activeCategory === category ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex justify-between">
                <h3 className="text-sm font-medium lg:text-md p-3">Product Available : {products.length}</h3>
                <div className="flex text-md text-gray-500">
                  <span className="items-center p-3 text-sm lg:text-md">Sort By</span>
                  <div className="relative inline-block text-left">
                    <div
                      onClick={handleToggleDropdownSort}
                      className="flex items-center justify-between text-sm w-30 lg:w-50 h-12 px-2 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                    >
                      <span>{selected}</span>
                      <i
                        className={`ri-arrow-down-s-line transition-transform duration-300 ${
                          isDropdownMenuSort ? "rotate-180" : ""
                        }`}
                      ></i>
                    </div>

                    {isDropdownMenuSort && (
                      <div className="absolute z-10 w-35 origin-top-right rounded-2xl bg-white shadow-xl transition-all duration-300">
                        <ul className="py-2 text-md">
                          {sortBy.map((option, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelectSort(option)}
                              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                option === selected ? "bg-gray-100" : ""
                              }`}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {productsData && (
                <div className="mt-12">
                  <ProductCards productsData={productsData.slice(0, visibleProducts)} />
                </div>
              )}
            </div>
          )}
        </div>
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
        <div className="flex items-center justify-between bg-white px-4 mt-2 sm:px-6">
          <div className="flex flex-1 justify-between ">
            <p className="text-sm text-gray-500 text-center lg:block">Showing 1-12 of 55 products</p>
          </div>
          <div className="lg:items-center bg-white">
            <nav className="isolate inline-flex -space-x-px rounded-md " aria-label="Pagination">
              <Link
                to="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <i className="ri-arrow-left-s-line text-sm"></i>
              </Link>
              <Link
                to="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </Link>
              <Link
                to="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </Link>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">
                ...
              </span>
              <Link
                to="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </Link>
              <Link
                to="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <i className="ri-arrow-right-s-line text-sm"></i>
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 section__container">
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
        <Link to="" className="hover:scale-105 transition-transform">
          <div className="rounded">
            <img
              className=""
              src="https://media3.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/November2024/mceclip0_55.jpg"
              alt=""
            />
          </div>
        </Link>
      </section>
    </div>
  );
};

export default ShopPage;
