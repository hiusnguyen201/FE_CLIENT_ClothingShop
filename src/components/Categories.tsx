import { Category } from "@/types/category";
import React from "react";
import { Link } from "react-router-dom";

interface CategoriesProps {
  categoriesData: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categoriesData }) => {
  return (
    <div className="w-full overflow-x-auto section__container ">
      <div className="flex gap-4 w-max">
        {categoriesData.map((c) => (
          <Link key={c.id} to={c.subCategory ? `/category/${c.category}/${c.subCategory}` : `/category/${c.category}`}>
            <div className="min-w-[200px] w-[200px] rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:scale-105 transition-transform">
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
