import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RatingStarts from "@/components/RatingStars";
import { ColorBadge } from "@/components/productSlice/ColorBadge";
import { Button } from "@/components/ui/button";
const SingleProduct: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="section__container bg__banner">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="link opacity-80">
            <Link to="/">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="link opacity-80">
            <Link to="/shop">Shop</Link>
            <i className="ri-arrow-right-s-line"></i>
          </span>
          <span className="link opacity-80">
            <Link to="/">Product Name</Link>
          </span>
        </div>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* product image */}
          <div className="md:w-1/2 w-full">
            <img
              className="rounded-md w-full h-auto"
              src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg"
              alt=""
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-3xl font-semibold mb-4">T-Shirt</h3>
            <div className="flex gap-1 items-center">
              <strong className="mb-1">Rating: </strong>
              <RatingStarts rating={4} />
            </div>
            <s className="opacity-70 text-sm text-gray-600 ">299.000đ</s>
            <div className="flex space-x-2">
              <p className="text-2xl text-red-500 mb-4">259.000đ</p>
              <p className="text-white p-1 bg-red-500 rounded-xl font-bold text-sm h-7">-13%</p>
            </div>
            <p className="text-gray-500 mb-4 text-lg">Voucher: Discount 20k</p>

            {/* additional product info */}
            <div>
              <p className="text-stone-600 text-md">Color: Black</p>
              <div className="flex mb-2 items-center gap-1 sm:gap-2 flex-wrap mt-2">
                {["#000", "#ffffff", "#9FC5E8"].map((color, i) => (
                  <ColorBadge key={i} color={color} active={i === 0} />
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-stone-600 text-md">Size:</p>
                <Link to={""} className="text-blue-500 text__underline">
                  Instructions for choosing size
                </Link>
              </div>
              <div className="flex flex-wrap gap-1">
                {["S", "M", "L", "XL", "2XL"].map((size, i) => (
                  <Button key={i} className="bg-gray-300 mt-2 hover:bg-gray-400 w-[40px] h-[38px] ">
                    {size}
                  </Button>
                ))}
              </div>
              <button className="mt-6 px-5 py-3 bg-red-500 text-white rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      {/* display review */}
      <section className="section__container mt-6">Review here</section>
    </div>
  );
};

export default SingleProduct;
