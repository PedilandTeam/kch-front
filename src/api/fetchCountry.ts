import type { Country } from "@/schemas";
import fetchWrapper from "./fetchWrapper";

export type FetchCountry = { code?: string };

export default async function fetchCountry(
  filters?: FetchCountry,
  revalidate?: number,
): Promise<Country[]> {
  return await fetchWrapper("/countries", {
    filters: filters,
    revalidate: revalidate,
  });
}
