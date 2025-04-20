import { Category } from "@/types/category";
import { Nullable } from "@/types/common";
import { BaseResponse } from "@/types/response";

/**
 * State
 */
export interface CategoriesState {
  loading: {
    getCategories: boolean;
    getCategory: boolean;
  };
  category: Nullable<Category>;
  categories: Category[];
  error: Nullable<string>;
  totalCount: number;
  page: number;
  limit: number;
}

/**
 * Get categories
 */
export interface GetCategoriesResponse extends BaseResponse<{ totalCount: number, list: Category[] }> { }

/**
 * Get category by id
 */
export interface GetCategoryResponse extends BaseResponse<Category> { }
