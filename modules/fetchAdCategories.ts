import { AdCategoryNamepace } from "@/types/adCategory";
import { CategoryNamespace } from "@/types/category";
import wretch from 'wretch';
import { WretchError } from "wretch/resolver";


export default async function fetchAdCategories({ justMain, parentId, search, revalidate }: { justMain?: boolean, parentId?: number, search?: string, revalidate?: number }): Promise<AdCategoryNamepace.IAdCategory[]> {
    const urlObject = new URL(`${process.env.API_URL}/ad-categories`)

    if (justMain) urlObject.searchParams.append('justMain', 'true')
    if (parentId) urlObject.searchParams.append('parentId', parentId.toString())
    if (search) urlObject.searchParams.append('search', search)

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
            console.error(`Error Accourd in fetchAdCategory. params {justMain: ${justMain}, parentId: ${parentId}, search: ${search}}`, e.json, e.message)
            return null;
        })
}