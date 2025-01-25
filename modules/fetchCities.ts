import { CityNamespace } from '@/types/city';
import fetchWrapper from './fetchWrapper';


export type FetchCities = {
    slug?: string;
    page?: number | string;
    limit?: number | string;
    countryCode?: string;
    countryId?: number | string;
    search?: string;
    revalidate?: number;
}
 
export default async function fetchCities(filters: FetchCities, revalidate?: number): Promise<CityNamespace.GET>{
    return await fetchWrapper<CityNamespace.GET, FetchCities>('/cities', { filters: filters, isPaginated: true, revalidate: revalidate });
}
