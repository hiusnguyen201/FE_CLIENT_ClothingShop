import { SubCategory } from "@/types/subCategory";
import React from "react";
import { Link } from "react-router-dom";

interface SubCategoriesProps {
  subCategoriesData: SubCategory[];
}

const SubCategories: React.FC<SubCategoriesProps> = ({ subCategoriesData }) => {
  return (
    <div className="w-full overflow-x-auto section__container ">
      <div className="flex gap-4 w-max">
        {subCategoriesData.map((sc) => (
          <Link key={sc.id} to={`/category/${sc.category}/${sc.subCategory}`}>
            <div className="min-w-[200px] w-[200px] rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:scale-105 transition-transform">
              <img src={sc.image} alt={sc.name} className="w-full aspect-[3/4] object-cover" />
              <div className="text-center py-2 font-semibold text-gray-700 uppercase">{sc.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
