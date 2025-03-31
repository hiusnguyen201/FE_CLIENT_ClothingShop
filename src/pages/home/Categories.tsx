import React from "react";

import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";
import { Link } from "react-router-dom";

interface Category {
  icon: string;
  name: string;
  slug: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    { name: "Accessories", slug: "accessories", icon: category1 },
    { name: "Dress Collection", slug: "dress", icon: category2 },
    { name: "Jewellery", slug: "jewwllery", icon: category3 },
    { name: "Shoes", slug: "shoes", icon: category4 },
  ];
  return (
    <div>
      <div className="product__grid">
        {categories.map((categories) => (
          <Link
            key={categories.slug}
            to={`/categories/${categories.slug}`}
            className="categories__card"
          >
            <img src={categories.icon} alt={categories.name} />
            <h4>{categories.name}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
