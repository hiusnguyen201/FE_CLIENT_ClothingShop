import React from "react";
import { Link } from "react-router-dom";

interface Category {
  image: string;
  name: string;
  slug: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      name: "Accessories",
      slug: "accessories",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
    {
      name: "Dress Collection",
      slug: "dress",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
    {
      name: "Jewellery",
      slug: "jewellery",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
    {
      name: "Shoes",
      slug: "shoes",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
  ];
  return (
    <div>
      <div className="product__grid">
        {categories.map((categories) => (
          <Link key={categories.slug} to={`/categories/${categories.slug}`} className="categories__card">
            <img src={categories.image} alt={categories.name} />
            <h4>{categories.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
