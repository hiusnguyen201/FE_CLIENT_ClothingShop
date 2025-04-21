export interface Product {
  _id: string;
  name: string;
  category_id: string;
  sub_category_id: string;
  sub_sub_category_id: string;
  short_description: string;
  price: number;
  originalPrice: number;
  image: string;
  colors: string[];
  sizes: string[];
  discount?: string;
  rating: number;
  author?: string;
  createdAt?: string;
  total_sold?: number;
  isNew?: boolean;
}
