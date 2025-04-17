import React from "react";
import { Link } from "react-router-dom";

interface Cards {
  id: number;
  image: string;
  description: string;
  title: string;
}

const HeroSection: React.FC = () => {
  const cards: Cards[] = [
    {
      id: 1,
      image:
        "https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/March2025/Section_Banner_888x600.jpg",
      description: "Sale 40% or Freeship",
      title: "Women Shirt",
    },
    {
      id: 2,
      image:
        "https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/March2025/Section_Banner_888x600.jpg",
      description: "Sale 40% or Freeship",
      title: "Women Dresses",
    },
    {
      id: 3,
      image:
        "https://media3.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/March2025/Section_Banner_888x600.jpg",
      description: "Sale 40% or Freeship",
      title: "Women Dresses",
    },
  ];
  return (
    <section className="section__container hero__container">
      {cards.map((card) => (
        <div key={card.id} className="hero__card">
          <img src={card.image} alt={card.title} className="hover:scale-105 transition-transform" />
          <div className="hero__content">
            <h4 className="text-white">{card.title}</h4>
            <p className="text-2xl">{card.description}</p>
            <Link to={""} className="bg-white px-7 hover:bg-gray-100 rounded-xl py-4">
              Mua ngay
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
