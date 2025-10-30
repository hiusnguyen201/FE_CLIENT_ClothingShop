import { Category } from "./category";
import { Nullable } from "./common";

export enum PRODUCT_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
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
  productOptions: Array<ProductOption>;
  productVariants: Array<ProductVariant>;
}

export interface ProductOption {
  id: string;
  option: Option;
  optionValues: Array<OptionValue>;
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
  price: number;
  product: string;
  quantity: number;
  sku: string;
  variantValues: Array<VariantValue>;
}

export interface VariantValue {
  id: string;
  option: Option;
  optionValue: OptionValue;
}
