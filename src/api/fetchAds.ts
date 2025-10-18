import { AdNamespace } from '@/types/ad';
import fetchWrapper from './_fetchWrapper';

interface Filters {
    [key: string]: any;
    page?: number;
    limit?: number;
    countryCode?: string;
    cityIds?: number[];
    categoryId?: number | string;
    categorySlug?: string;
    search?: string;
    id?: string;
}
export default async function fetchAds(filters: Filters, revalidate?: number): Promise<AdNamespace.GET | AdNamespace.IAd> {
    if (!!filters.id) {
        return await fetchWrapper<AdNamespace.IAd, Filters>(`/ads/${filters.id}`, { isPaginated: true, revalidate: revalidate });
    } else {
        return await fetchWrapper<AdNamespace.GET, Filters>(`/ads`, { filters, isPaginated: true, revalidate: revalidate });
    }
}
