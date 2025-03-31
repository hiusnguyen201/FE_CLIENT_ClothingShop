import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleCartOpenToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            VNShop<span>.</span>
          </Link>
        </div>
        {/* nav icon */}
        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>
          <span>
            <button
              className="hover:text-primary"
              onClick={handleCartOpenToggle}
            >
              <i className="ri-shopping-bag-line"></i>
              {/* <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">
                {products.length}
              </sup> */}
            </button>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
