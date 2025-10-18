import type { GetCategoryResponse } from "@/types/category";
import fetchWrapper from "./_fetchWrapper";

export type FetchCategories = {
  page?: number | string;
  limit?: number | string;
  slug?: string;
  revalidate: number;
};
export default async function fetchCategories(
  filters: FetchCategories,
  revalidate?: number,
): Promise<GetCategoryResponse> {
  return await fetchWrapper<GetCategoryResponse>("/categories", {
    filters: filters,
    revalidate: revalidate,
  });
}
