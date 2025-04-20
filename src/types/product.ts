import { Category } from "./category";
import { Nullable } from "./common";

export enum PRODUCT_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface Option {
  id: string;
  name: string;
}

export interface OptionValue {
  id: string;
  valueName: string;
}

export interface ProductVariant {
  id: string;
  quantity: number;
  price: number;
  sku: string;
  product: string;
  variantValues: {
    option: Option;
    optionValue: OptionValue;
    id: string;
  }[];
}

export interface Product {
  id: string;
  thumbnail: string;
  name: string;
  slug: string;
  description: string;
  status: PRODUCT_STATUS;
  category: Category;
  subCategory: Nullable<Category>;
  productVariants: ProductVariant[];
  productOptions: {
    option: Option;
    optionValues: OptionValue[];
    id: string;
  }[];
}