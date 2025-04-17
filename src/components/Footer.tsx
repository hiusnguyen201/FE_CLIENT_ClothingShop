import React from "react";

const Footer: React.FC = () => {
  return (
    <div>
      <hr className="opacity-7" />
      <footer className="section__container footer__container">
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
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="#">Home</a>
          <a href="#">About Us</a>
          <a href="#">Work With Us</a>
          <a href="#">Our Blog</a>
          <a href="#">Terms & Conditions</a>
        </div>
        <div className="footer__col">
          <h4>USERFUL LINK</h4>
          <a href="#">Help</a>
          <a href="#">Track My Order</a>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Sugar</a>
        </div>
        <div className="footer__col">
          <h4>FACEBOOK</h4>
          <div className="facebook__grid">
            <img
              src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg"
              alt="facebookImg1"
            />
            <img
              src="https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2025/Thun_20.jpg"
              alt="facebookImg1"
            />
          </div>
        </div>
      </footer>
      <div className="footer__bar"> © Copyright 2025 by VNShop Group</div>
    </div>
  );
};

export default Footer;
