import useSWR from "swr";
import { api } from "@/api/client";
import { swrKeys } from "./swrKeys";
import type { Country } from "@/schemas";

export function useCountries(filters?: {
  status?: boolean | number;
  code?: string;
}) {
  const normalizedFilters = filters
    ? {
        ...filters,
        status:
          typeof filters.status === "boolean"
            ? Number(filters.status)
            : filters.status,
      }
    : undefined;

  const key = swrKeys.countries(normalizedFilters);

  const { data, error, isLoading, mutate } = useSWR<Country[]>(
    key,
    async ([_, params]) => {
      return api.get("/countries", {
        params,
      });
    },
  );

  return {
    countries: data,
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
