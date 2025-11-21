// This is a part of New Structure
import useSWR from "swr";
import { api } from "@/api/client";
import { swrKeys } from "./swrKeys";
import type { GetPagesResponse } from "@/types/page";

export function usePagesList(filters: {
  page?: number;
  limit?: number;
  countryCode: string;
  categoryIds: number | number[];
  cityIds?: number | number[];
  search?: string;
}) {
  // Normalize filter values
  const normalizedFilters: Record<string, any> = {
    ...filters,
    categoryIds: Array.isArray(filters.categoryIds)
      ? filters.categoryIds.join(",")
      : filters.categoryIds,

    ...(filters.cityIds && {
      cityIds: Array.isArray(filters.cityIds)
        ? filters.cityIds.join(",")
        : filters.cityIds,
    }),
  };

  const key = swrKeys.pages(normalizedFilters);

  const { data, error, isLoading, mutate } = useSWR<GetPagesResponse>(
    key,
    async ([_, params]) => {
      return api.get("/pages", { params });
    },
  );

  return {
    pages: data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
