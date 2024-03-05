import { CityNamespace } from '@/types/city';
import { UnitType } from '@/types/unit';
import wretch from 'wretch';
import { WretchError } from 'wretch/resolver';

export default async function fetchCities({
    slug,
    page = 1,
    limit = 300,
    countryCode,
    countryId,
    search,
    revalidate,
}: {
    slug: string;
    page?: number | string;
    limit?: number | string;
    countryCode?: string;
    countryId?: string;
    search?: string;
    revalidate: number;
}): Promise<CityNamespace.GET> {
    const urlObject = new URL(`${process.env.API_URL}/cities`);

    if (slug) urlObject.searchParams.append('slug', slug);
    if (page) urlObject.searchParams.append('page', page.toString());
    if (limit) urlObject.searchParams.append('limit', limit.toString());
    if (countryCode) urlObject.searchParams.append('countryCode', countryCode);
    if (countryId) urlObject.searchParams.append('countryId', countryId);
    if (search) urlObject.searchParams.append('search', search);

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
                `Error Accourd in fetchCities. params {slug: ${slug} page: ${page} limit: ${limit} countryCode: ${countryCode} countryId: ${countryId} search: ${search}}`,
                e?.json,
                e.message
            );
            return null;
        });
}
