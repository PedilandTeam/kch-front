import wretch from 'wretch';
import { WretchError } from 'wretch/resolver';

export const FETCHWRAPPER_DEFAULT_REVALIDATE = 300


export type Fetcher<T> = {
    filters?: {
        [key: string]: any;
    };
    isPaginated: boolean;
    revalidate?: number;
    overrideUrl?: string;
};
export default async function fetchWrapper<U, T>(
    path: string,
    { filters, overrideUrl, isPaginated, revalidate }: Fetcher<T>
): Promise<U> {
    const urlObject = new URL(
        overrideUrl ? overrideUrl : `${process.env.API_URL}${path}`
    );
    if (!filters) {
        filters = {}
    }

    if (isPaginated) {
        if (!filters.limit) filters.limit = 30;
        if (!filters.page) filters.page = 1;
    }

    if (filters) {
        Object.keys(filters).forEach((filter) => {
            const value = filters![filter];
            if (value) urlObject.searchParams.append(filter, String(value));
        });
    }

    const url = urlObject.toString();

    const OPTIONS = { next: { revalidate: revalidate ? revalidate : FETCHWRAPPER_DEFAULT_REVALIDATE } };

    return await wretch(url)
        .options(OPTIONS)
        .headers({
            "api-key": process.env.API_KEY
        })
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
