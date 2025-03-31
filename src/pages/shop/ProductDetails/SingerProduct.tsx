import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import RatingStarts from "@/components/RatingStars";

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
              src="https://images.unsplash.com/photo-1568251188392-ae32f898cb3b?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-3xl font-semibold mb-4">Product Name</h3>
            <p className="text-2xl text-red-500 mb-4">
              $100 <s className="opacity-70 text-xl text-stone-900">$130</s>
            </p>
            <p className="text-gray-400 mb-4">this product desc</p>

            {/* additional product info */}
            <div>
              <p>
                <strong>Category: </strong>accessories
              </p>
              <p className="py-1">
                <strong>Color: </strong>beige
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStarts rating={4} />
              </div>
              <button className="mt-6 px-5 py-3 bg-red-500 text-white rounded-md">
                Add to Card
              </button>
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
