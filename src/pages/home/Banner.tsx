import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png";

const Banner: React.FC = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">Sale Up to 50%</h4>
        <h1 className="text-[clamp(14px, 2vw, 24px)]">Clothing Shop</h1>
        <p>Clothing Shop is brand in VietNam</p>
        <button className="btn">
          <Link to="/shop">GET OFFER</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner image" />
      </div>
    </div>
  );
};

export default Banner;
