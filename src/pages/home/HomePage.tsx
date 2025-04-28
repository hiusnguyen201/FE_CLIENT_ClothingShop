import React from "react";
import Banner from "@/pages/home/Banner";
import Categories from "@/components/Categories";
import DealsSection from "@/pages/home/DealsSection";
import HeroSection from "@/pages/home/HeroSection";
import PromoBanner from "@/pages/home/PromoBanner";
import TrendingProducts from "@/pages/shop/TrendingProduct";
import Blogs from "@/pages/blogs/Blogs";

import blogsData from "@/data/blogs.json";

const HomePage: React.FC = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <HeroSection />
      <div className="section__container">
        <TrendingProducts />
      </div>
      <DealsSection />
      <PromoBanner />
      <Blogs blogsData={blogsData} />
    </div>
  );
};

export default HomePage;
