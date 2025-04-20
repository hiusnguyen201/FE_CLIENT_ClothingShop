import Banner from "@/pages/home/Banner";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "@/pages/cart/CartModal";

import productsData from "@/data/product.json";
import userData from "@/data/user.json";

const NavBar: React.FC = () => {
  const user = userData;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [isDropdownMenus, setIsDropdownMenus] = useState<boolean>(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleToggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleCartOpenToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId!);
    setIsDropdownMenus(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsDropdownMenus(false);
    }, 100);
  };

  const allSubCategories = [
    {
      name: "All Product",
      path: "men",
      subCategories: [
        { name: "New Product", path: "new-product" },
        { name: "Best Seller", path: "best-seller" },
      ],
    },
    {
      name: "Men's Shirt",
      path: "men-shirt",
      subCategories: [
        { name: "TankTop Shirt", path: "tanktop-shirt-men" },
        { name: "T-Shirt ", path: "t-shirt-men" },
        { name: "Sports Shirt", path: "sport-shirt-men" },
        { name: "Polo Shirt", path: "polo-shirt-men" },
        { name: "Shirt", path: "shirt-men" },
        { name: "Long sleeve shirt", path: "long-sleeve-shirt-men" },
        { name: "Jacket", path: "jacket-men" },
      ],
    },
    {
      name: "Men's Pants",
      path: "men-pants",
      subCategories: [
        { name: "Short Pants", path: "short-pants-men" },
        { name: "Jogger Pants ", path: "jogger-pants-men" },
        { name: "Sports Pants", path: "sport-pants-men" },
        { name: "Long Pants", path: "long-pants-men" },
        { name: "Jean Pants", path: "jean-pants-men" },
        { name: "Swimming Trunks", path: "swimming-trunks-men" },
      ],
    },
    {
      name: "Men's Underwear",
      path: "men-underwear",
      subCategories: [
        { name: "Brief", path: "brief-men" },
        { name: "Trunk", path: "trunk-men" },
        { name: "Boxer Brief", path: "boxer-brief-men" },
        { name: "Long Leg", path: "long-leg-men" },
        { name: "Home Pants", path: "home-pants-men" },
      ],
    },
    {
      name: "Accessory",
      path: "men-accessory",
      subCategories: [{ name: "All Accessories(socks, hats...)", path: "men-accessory" }],
    },
  ];

  const categoryAccordingToNeed = [
    { name: "Men's Underwear", path: "men-underwear" },
    { name: "Sports Pants", path: "sport-pants-men" },
    { name: "Home Pants", path: "home-pants-men" },
  ];

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link uppercase">
            <Link to="/">Home</Link>
          </li>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter} // Hover vào: mở menu
            onMouseLeave={handleMouseLeave}
          >
            <li className="link uppercase">
              <Link to="/shop">Men</Link>
            </li>
            {isDropdownMenus && (
              <div className="flex justify-between fixed mt-3 p-4 w-full left-0 right-0 bg-white border  border-gray-200 rounded-lg shadow-lg z-50">
                {/* category */}
                <div className=" flex-[7] border-r border-gray-300 border-opacity-30 flex flex-col">
                  <div className="p-2 flex justify-between">
                    {allSubCategories.map((category, index) => (
                      <div key={index}>
                        <ul>
                          <Link
                            to={`/categories/${category.path}`}
                            className="categories__navbar hover:text-red-500 text-xl"
                          >
                            {category.name} <i className="ri-arrow-right-long-line text-lg"></i>
                          </Link>
                          {category.subCategories?.map((subCategory, index) => (
                            <li key={index} className="py-3 text-stone-600 hover:text-red-500 text-sm">
                              <Link to={`categories/${subCategory.path}`}>{subCategory.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto bg-slate-100 p-2 text-2xl flex">
                    <div className="p-6 text-stone-600 flex-[3] border-r border-gray-200">According To Need</div>
                    <div className="flex flex-[7]">
                      {categoryAccordingToNeed.map((c, index) => (
                        <Link key={index} to={`/categories/${c.path}`} className="p-6 hover:text-red-500">
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {/* image */}
                <div className="font-medium p-2 flex-[3]">
                  <div className="p-2 relative">
                    <img
                      className="rounded-xl aspect-[18/10]"
                      src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
                      alt=""
                    />
                    <h1 className="absolute bottom-6 font-bold left-5 text-white text-xl">Men's Ultra Light Jeans</h1>
                  </div>
                  <div className="p-2 relative">
                    <img
                      className="rounded-xl aspect-[18/10]"
                      src="https://media3.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/April2025/Hero_Banner_-_Desktop-_mate.jpg"
                      alt=""
                    />
                    <h1 className="absolute bottom-6 font-bold left-5 text-white text-xl">Men's Ultra Light Jeans</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
          <li className="link uppercase">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="link uppercase">
            <Link to="/care&share">Care&Share</Link>
          </li>
        </ul>
        {/* logo */}
        <div className="nav__logo">
          <Link to="/">
            Shop<span>.</span>
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
            <button className="hover:text-red-500" onClick={handleCartOpenToggle}>
              <i className="ri-shopping-bag-line"></i>
              <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-red-500 text-center">
                {productsData.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <Link to="/account">
                <img src="https://mcdn.coolmate.me/image/October2023/mceclip3_72.png" alt="" className="w-6 h-6" />
              </Link>
            ) : (
              <Link to="/auth/login">
                <img src="https://www.coolmate.me/images/header/icon-account-new-v2.svg" alt="" className="w-5 h-5" />
              </Link>
            )}
          </span>
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu}>
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* display mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full z-50 bg-slate-200 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out
       ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* logo */}
        <div className="nav__logo flex justify-between">
          <Link to="/">
            Shop<span>.</span>
          </Link>
          <button>
            <i className="ri-close-line text-2xl" onClick={toggleMobileMenu}></i>
          </button>
        </div>
        <div className="bg-white aspect-[16] w-full rounded-lg shadow-md mt-2">
          <h4 className="categories__navbar flex justify-center pt-3">Explore men's clothing</h4>
          <Banner />
          <ul className="font-medium space-y-4 p-2">
            {allSubCategories.map((category, index) => (
              <li key={index}>
                <div
                  className="flex justify-between items-center p-2 cursor-pointer"
                  onClick={() => handleToggleDropdown(index)}
                >
                  <span className="dropdown-items uppercase text-lg font-normal">{category.name}</span>
                  <i
                    className={`ri-arrow-down-s-line transition-transform duration-300 ${
                      openDropdownIndex === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>

                <ul
                  className={`ml-4 text-gray-600 space-y-2 overflow-hidden transition-all duration-500 ${
                    openDropdownIndex === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  {category.subCategories?.map((c, i) => (
                    <li key={i}>
                      <Link to={`/sub_category/${c.path}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white aspect-[16] w-full rounded-lg shadow-md mt-2 flex justify-between items-center p-4">
          <h4 className="text-xl uppercase font-normal">Care & Share</h4>
          <div className="flex text-3xl space-x-3 items-center">
            <img src="https://mcdn.coolmate.me/image/February2025/mceclip0.png" alt="care & share" className="h-10" />
            <i className="ri-arrow-right-s-line p-3 bg-gray-200 rounded-full"></i>
          </div>
        </div>
        <div className="bg-white h-70 mt-2">
          <ul className="text-gray-600 p-6 ml-8">
            <li className="mt-2 text-red-500">
              <Link to={""}>
                Club <i className="ri-star-fill"></i>
              </Link>
            </li>
            <li className="mt-2">
              <Link to={""}>Customer care center</Link>
            </li>
            <li className="mt-2">
              <Link to={""}>About Shop</Link>
            </li>
            <li className="mt-2">
              <Link to={""}>Login</Link>
            </li>
            <li className="mt-2">
              <Link to={""}>Blog</Link>
            </li>
          </ul>
        </div>
      </div>
      {isCartOpen && <CartModal productsData={productsData} isCartOpen={isCartOpen} onClose={handleCartOpenToggle} />}
    </header>
  );
};

export default NavBar;
