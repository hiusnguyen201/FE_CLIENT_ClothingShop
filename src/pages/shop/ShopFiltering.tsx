import { Filters, FiltersState } from "@/models/Filters";
import React from "react";

interface ShopFilteringProps {
  filters: Filters;
  filtersState: FiltersState;
  setFiltersState: React.Dispatch<React.SetStateAction<FiltersState>>;
  clearFilters: () => void;
}

const ShopFiltering: React.FC<ShopFilteringProps> = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      {/* filter by category */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr className="opacity-20" />
        {filters.category.map((category) => (
          <label key={category} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
              checked={filtersState.category === category}
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* filter by color */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Color</h4>
        <hr className="opacity-20" />
        {filters.color.map((color) => (
          <label key={color} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="color"
              id="color"
              value={color}
              onChange={(e) =>
                setFiltersState({ ...filtersState, color: e.target.value })
              }
              checked={filtersState.color === color}
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>

      {/* filter by range */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr className="opacity-20" />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  priceRanges: e.target.value,
                })
              }
              checked={filtersState.priceRanges === `${range.min}-${range.max}`}
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* clear filters */}
      <button
        onClick={clearFilters}
        className="bg-red-500 py-1 px-4 text-white rounded"
      >
        All Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
