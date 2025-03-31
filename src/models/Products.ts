export interface Product {
  _id: string;
  name: string;
  category_id: string;
  short_description?: string;
  content?: string;
  price: number;
  oldPrice?: number;
  image: string;
  color: string;
  rating: number;
  author?: string;
}
