import React from "react";
import { Link } from "react-router-dom";

interface Category {
  id: string;
  image: string;
  name: string;
  slug: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    {
      id: "1",
      name: "T-Shirt",
      slug: "shirt",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
    {
      id: "2",
      name: "T-Shirt",
      slug: "shirt",
      image: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/March2025/image-ao-thun-1_18.jpg",
    },
  ];
  return (
    <div className="w-full overflow-x-auto section__container ">
      <div className="flex gap-4 w-max">
        {categories.map((c) => (
          <Link key={c.id} to={`/collection/${c.slug}`}>
            <div className="min-w-[240px] w-[240px] rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:scale-105 transition-transform">
              <img src={c.image} alt={c.name} className="w-full aspect-[3/4] object-cover" />
              <div className="text-center py-2 font-semibold text-gray-700 uppercase">{c.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
