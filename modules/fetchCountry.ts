import { CountryNamespace } from "@/types/country";
import fetchWrapper from "./fetchWrapper";


export type FetchCountry = { code: string, revalidate: number }
export default async function fetchCountry(filters: FetchCountry, revalidate?: number): Promise<CountryNamespace.GET[]> {
    return await fetchWrapper('/countries', { filters: filters, isPaginated: false, revalidate: revalidate });
}