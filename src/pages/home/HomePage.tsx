import React from "react";
import Banner from "@/pages/home/Banner";
import Categories from "@/pages/home/Categories";
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
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs blogsData={blogsData} />
    </div>
  );
};

export default HomePage;
