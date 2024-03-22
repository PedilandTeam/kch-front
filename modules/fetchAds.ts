import { AdNamespace } from '@/types/ad';
import fetchWrapper from './fetchWrapper';

interface Filters {
    [key: string]: any;
    page?: number;
    limit?: number;
    coutnryCode?: string;
    cityIds?: number[];
    categoryId?: number | string;
    categorySlug?: string;
    search?: string
}
export default async function fetchAds(filters: Filters, revalidate?: number): Promise<AdNamespace.GET> {
    return await fetchWrapper<AdNamespace.GET, Filters>('/ads', { filters, isPaginated: true, revalidate: revalidate });
}
