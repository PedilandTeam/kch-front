import useSWR from "swr";
import { api } from "@/api/client";
import { swrKeys } from "./swrKeys";
import type { GetPagesResponse, Page } from "@/types/page";
import { fetcher } from "./fetcher";

interface UsePagesListFilters {
  limit: number;
  page: number;
  search?: string;
  countryCode?: string;
  cityIds?: number | number[];
  categoryIds?: number | number[];
  unitId?: number | number[];
  slug?: string;
  status?: boolean;
  haveOwner?: boolean;
}

function normalizeParam(value: any) {
  if (value === undefined || value === null) return undefined;
  if (Array.isArray(value)) return value.length ? value.join(",") : undefined;
  return value;
}

export function usePagesList(filters: UsePagesListFilters) {
  const normalizedFilters = {
    page: filters.page,
    limit: filters.limit,
    search: filters.search,
    countryCode: filters.countryCode,
    slug: filters.slug,
    status: filters.status,
    haveOwner: filters.haveOwner,
    categoryIds: normalizeParam(filters.categoryIds),
    cityIds: normalizeParam(filters.cityIds),
    unitId: normalizeParam(filters.unitId),
  };

  const key = swrKeys.pages(normalizedFilters);

  const params = new URLSearchParams(
    Object.entries(normalizedFilters).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  const url = `/pages?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<GetPagesResponse>(key, () =>
    fetcher<GetPagesResponse>(url),
  );

  return {
    pages: data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
