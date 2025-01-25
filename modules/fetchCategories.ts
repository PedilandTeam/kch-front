import { CategoryNamespace } from '@/types/category';
import fetchWrapper from './fetchWrapper';

export type FetchCategories = {
    page?: number | string;
    limit?: number | string;
    slug?: string;
    revalidate: number;
};
export default async function fetchCategories(filters: FetchCategories, revalidate?: number): Promise<CategoryNamespace.GET> {
    return await fetchWrapper<CategoryNamespace.GET, FetchCategories>('/categories', { filters: filters, isPaginated: true, revalidate: revalidate });
}
