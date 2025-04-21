import { Button } from "@/components/ui/button";
import React from "react";

interface FilterCategoriesProps {
  name: string;
  image: string;
  category?: string;
  subSubCategory: string;
  toggleSubSub: (subSub: string) => void;
}

const FilterCategories: React.FC<FilterCategoriesProps> = ({ name, image, toggleSubSub, subSubCategory }) => {
  return (
    <div className="flex gap-4 w-max">
      <Button
        className="h-60 shadow-none cursor-pointer hover:scale-105 transition-transform"
        onClick={() => toggleSubSub(subSubCategory)}
      >
        <div className="w-40 h-45">
          <img src={image} alt="" className="aspect-[3/4] object-cover" />
          <div className="text-center py-2 font-semibold text-gray-700">{name}</div>
        </div>
      </Button>
    </div>
  );
};

export default FilterCategories;
