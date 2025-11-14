import type { AdCategory } from "@/types/adCategory";
import fetchWrapper from "./fetchWrapper";

type FetchAdCategories = {
  justMain?: boolean;
  parentId?: number | string;
  parentSlug?: string;
  search?: string;
  slug?: string;
};

export default async function fetchAdCategories(
  filters?: FetchAdCategories,
  revalidate?: number,
): Promise<AdCategory[]> {
  return fetchWrapper<AdCategory[]>(`/ad-categories`, {
    filters,
    revalidate: revalidate,
  });
}
