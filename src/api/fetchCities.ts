import type { GetCitiesResponse } from "@/schemas";
import fetchWrapper from "./fetchWrapper";

export type CitiesFilters = {
  slug?: string;
  page?: number | string;
  limit?: number | string;
  countryCode?: string;
  countryId?: number | string;
  search?: string;
  revalidate?: number;
};

export default async function fetchCities(
  filters: CitiesFilters,
  revalidate?: number,
): Promise<GetCitiesResponse> {
  return await fetchWrapper("/cities", {
    filters: filters,
    revalidate: revalidate,
  });
}
