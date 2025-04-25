import React from "react";
import { Link } from "react-router-dom";

const DealsSection: React.FC = () => {
  return (
    <section className="section__container deals__container">
      <picture>
        {/* Ảnh cho màn hình nhỏ (dưới md) */}
        <source
          media="(max-width: 767px)"
          srcSet="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Casual_-_Mobilesds.jpg"
        />
        {/* Ảnh mặc định cho màn hình lớn */}
        <img
          src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Casual_-_Desktopsds.jpg"
          alt="deals image"
          className="object-cover rounded-lg h-full mb-2 w-full"
        />
      </picture>
      <div className="lg:deals__content absolute bottom-[15%] lg:bottom-[20%] lg:p-5 max-w-100 ml-5 ">
        <div className="mb-5 text__shadow text-white">
          <h4 className="text-2xl font-bold lg:text-6xl uppercase">RUNNING COLLECTION </h4>
          <h5>Get Up To 50% Discount</h5>
        </div>
        <Link to={""} className="bg-white px-9 rounded-xl py-3 lg:py-4 ">
          Buy now <i className="ri-arrow-right-long-line mt-1 ml-2"></i>
        </Link>
      </div>
    </section>
  );
};

export default DealsSection;
