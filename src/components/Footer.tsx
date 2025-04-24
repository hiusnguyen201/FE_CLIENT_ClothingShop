import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div>
      <hr className="opacity-7" />
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4 className="uppercase">Cool club</h4>
          <Link to="/">Account CoolClub</Link>
          <Link to="/">Offers & Privileges</Link>
          <h4 className="uppercase">Documents - Recruitment</h4>
          <Link to="/">Tuyển dụng</Link>
          <Link to="/">Register copyright</Link>
        </div>
        <div className="footer__col">
          <h4 className="uppercase">Policy</h4>
          <Link to="/">60 day return policy</Link>
          <Link to="/">Privacy policy</Link>
          <Link to="/">Delivery policy</Link>
        </div>
        <div className="footer__col">
          <h4 className="uppercase">Chăm sóc khách hàng</h4>
          <Link to="/">100% Satisfaction Shopping Experience</Link>
          <Link to="/">FAQs</Link>
          <h4 className="uppercase">Knowledge of dressing well</h4>
          <Link to="/">Men's clothing size guide</Link>
          <Link to="/">Guide to choosing women's clothing size</Link>
          <Link to="/">Blog</Link>
        </div>
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            123, Cầu giấy, Hà Nội, Việt Nam
          </p>
          <p>
            <span>
              <i className="ri-mail-line"></i>
            </span>
            gmail@gmail.com
          </p>
          <p>
            <span>
              <i className="ri-phone-line"></i>
            </span>
            0992132132
          </p>
        </div>
      </footer>
      <div className="footer__bar"> © Copyright 2025 by VNShop Group</div>
    </div>
  );
};

export default Footer;
