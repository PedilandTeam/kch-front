import { AdNamespace } from '@/types/ad';
import { AdCategoryNamepace } from '@/types/adCategory';
import { CategoryNamespace } from '@/types/category';
import wretch from 'wretch';
import { WretchError } from 'wretch/resolver';

interface Filters {
    [key: string]: any;
    page?: number;
    limit?: number;
    coutnryCode?: string;
    cityIds?: number[];
    revalidate?: number;
    categoryId?: number | string;
    categorySlug?: string;
    search?: string
}
export default async function fetchAds(filters: Filters): Promise<AdNamespace.GET> {
    const urlObject = new URL(`${process.env.API_URL}/ads`);

    Object.keys(filters).forEach(filter => {
        const value = filters[filter];
        if (value) urlObject.searchParams.append(filter, String(value));
    })

    const url = urlObject.toString();

    const { revalidate } = filters
    const OPTIONS = revalidate ? { next: {revalidate}} : {}

    return await wretch(url)
        .options(OPTIONS)
        .get()
        .json((json) => {
            return json;
        })
        .catch((e: WretchError) => {
            console.error(
                `Error Accourd in fetchAds. params:`,
                filters,
                e.json,
                e.message
            );
            if (e.json) {
                return e.json;
            }
            return null;
        });
}
