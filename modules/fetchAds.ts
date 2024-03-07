import { AdNamespace } from "@/types/ad";
import { AdCategoryNamepace } from "@/types/adCategory";
import { CategoryNamespace } from "@/types/category";
import wretch from 'wretch';
import { WretchError } from "wretch/resolver";


export default async function fetchAds({ page=1, limit= 35, coutnryCode, cityIds, revalidate }: { page?: number, limit?: number, coutnryCode?: string, cityIds?: number[], revalidate?: number }): Promise<AdNamespace.GET> {
    const urlObject = new URL(`${process.env.API_URL}/ads`)

    if (page) urlObject.searchParams.append('page', String(page))
    if (limit) urlObject.searchParams.append('limit', String(limit))
    if (coutnryCode) urlObject.searchParams.append('countryCode', String(coutnryCode))
    if (cityIds) urlObject.searchParams.append('cityIds', String(cityIds))

    const url = urlObject.toString()
    const OPTIONS = {
        next: {
            revalidate
        }
    }
    return await wretch(url)
        .options(OPTIONS)
        .get()
        .json(json => {
            return json
        })
        .catch((e: WretchError) => {
            console.error(`Error Accourd in fetchAds. params {page: ${page}, limit: ${limit}, coutnryCode: ${coutnryCode}, cityIds: ${cityIds}}`, e.json, e.message)
            if (e.json) {
                return e.json;
            }
            return null
        })
}