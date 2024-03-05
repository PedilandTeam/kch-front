import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import wretch from 'wretch'
import { WretchError } from "wretch/resolver";


export default async function fetchCategories({ limit = 300, page = 1, slug, revalidate }: { page?: number | string, limit?: number | string, slug?: string, revalidate: number }): Promise<CategoryNamespace.GET> {
    const urlObject = new URL(`${process.env.API_URL}/categories`)

    if (limit) urlObject.searchParams.append('limit', limit.toString())
    if (page) urlObject.searchParams.append('page', page.toString())
    if (slug) urlObject.searchParams.append('slug', slug.toString())

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
            console.error(`Error Accourd in fetchCountry. params {limit: ${limit}, page: ${page}, slug: ${slug}}`, e.json, e.message)
            return null;
        })
}