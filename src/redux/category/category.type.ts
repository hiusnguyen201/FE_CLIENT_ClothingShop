import { Category } from "@/types/category";
import { Nullable } from "@/types/common";
import { BaseResponse, GetListParams, GetListResponseData } from "@/types/response";

/**
 * State
 */
export interface CategoriesState {
  loading: {
    getListCategory: boolean;
    getCategory: boolean;
  };
  category: Nullable<Category>;
  list: Category[];
  error: Nullable<string>;
  totalCount: number;
}

/**
 * Get list category
 */
type CategoryFieldsSort = Extract<"name" | "createdAt", Category>;
export interface GetListCategoryPayload extends GetListParams<CategoryFieldsSort> {
  // sortBy: Optional<Nullable<CategoryFieldsSort>>;
}

export interface GetListCategoryResponse extends GetListResponseData<Category> { }



/**
 * Get category
 */
export interface GetCategoryPayload {
  id: string;
}
export interface GetCategoryResponse extends BaseResponse<Category> { }
