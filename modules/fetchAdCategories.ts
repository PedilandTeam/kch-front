import { AdCategoryNamepace } from '@/types/adCategory';
import { CategoryNamespace } from '@/types/category';
import wretch from 'wretch';
import { WretchError } from 'wretch/resolver';

export default async function fetchAdCategories({
    justMain,
    parentId,
    parentSlug,
    search,
    revalidate,
    slug,
}: {
    justMain?: boolean;
    parentId?: number | string;
    parentSlug?: string;
    search?: string;
    revalidate?: number;
    slug?: string;
}): Promise<AdCategoryNamepace.IAdCategory[]> {
    const urlObject = new URL(`${process.env.API_URL}/ad-categories`);

    if (parentId && parentSlug) {
        console.error(
            `Error Accourd in fetchAdCategory. params {parentId: ${parentId}, parentSlug: ${parentSlug}}`
        );
        throw Error(
            `Error Accourd in fetchAdCategory. params {parentId: ${parentId}, parentSlug: ${parentSlug}}`
        );
    }

    if (justMain) urlObject.searchParams.append('justMain', 'true');
    if (parentId)
        urlObject.searchParams.append('parentId', parentId.toString());
    if (search) urlObject.searchParams.append('search', search);
    if (slug) urlObject.searchParams.append('slug', slug);
    if (parentSlug) urlObject.searchParams.append('parentSlug', parentSlug);

    const url = urlObject.toString();
    const OPTIONS = {
        next: {
            revalidate,
        },
    };
    return await wretch(url)
        .options(OPTIONS)
        .get()
        .json((json) => {
            return json;
        })
        .catch((e: WretchError) => {
            console.error(
                `Error Accourd in fetchAdCategory. params {justMain: ${justMain}, parentId: ${parentId}, search: ${search}}`,
                e.json,
                e.message
            );
            return null;
        });
}
