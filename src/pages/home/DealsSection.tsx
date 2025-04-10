import React from "react";
import { Link } from "react-router-dom";

const DealsSection: React.FC = () => {
  return (
    <section className="section__container deals__container">
      <div className="">
        <img
          src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/hang-ngay-desk-chung_100.jpg"
          alt="deals image"
        />
      </div>
      <div className="deals__content">
        <h5>Get Up To 50% Discount</h5>
        <h4>CASUALWEAR COLLECTION</h4>
        <p>Explore Clothing Shop in Vietnam</p>
        <Link to={""} className="bg-white px-9 rounded-xl py-4">
          Mua ngay
        </Link>
      </div>
    </section>
  );
};

export default DealsSection;
