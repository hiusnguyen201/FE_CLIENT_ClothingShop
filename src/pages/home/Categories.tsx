import { getCategories } from "@/redux/category/category.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(
    state => state.categories
  );

  useEffect(() => {
    dispatch(
      getCategories({
        limit: 10,
        sortBy: "createdAt"
      })
    );
  }, [dispatch]);

  return (
    <div className="w-full overflow-x-auto section__container ">
      <div className="flex gap-4 w-max">
        {categories.map((c, index) => (
          <Link to={`/search?category=${c.id}`} key={index}>
            <div
              className="min-w-[240px] w-[240px] rounded-lg overflow-hidden bg-white shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
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
