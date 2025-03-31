export interface Filters {
  category: string[];
  color: string[];
  priceRanges: { label: string; min: number; max: number }[];
}

export interface FiltersState {
  category: string;
  color: string;
  priceRanges: string;
}
