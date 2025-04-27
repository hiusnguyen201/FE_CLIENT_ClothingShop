import React from "react";
import Banner from "@/pages/home/Banner";
import Categories from "@/components/Categories";
import DealsSection from "@/pages/home/DealsSection";
import HeroSection from "@/pages/home/HeroSection";
import PromoBanner from "@/pages/home/PromoBanner";
import TrendingProducts from "@/pages/shop/TrendingProduct";
import Blogs from "@/pages/blogs/Blogs";

import blogsData from "@/data/blogs.json";
import categoriesData from "@/data/categories.json";

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories categoriesData={categoriesData} />
      <HeroSection />
      <div className="section__container">
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader ">Explore Clothing Shop in Vietnam</p>
        <TrendingProducts />
      </div>
      <DealsSection />
      <PromoBanner />
      <Blogs blogsData={blogsData} />
    </div>
  );
};

export default HomePage;
