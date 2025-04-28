import { useAppSelector } from "@/redux/store";
import React from "react";
import { Link } from "react-router-dom";


const Categories: React.FC = () => {
  const { list } = useAppSelector((state) => state.categories)

  return (
    <div className="w-full overflow-x-auto section__container ">
      <div className="flex gap-4 w-max">
        {list.map((c) => (
          <Link key={c.id} to={`/category/${c.slug}/`}>
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
