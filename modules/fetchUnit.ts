import { UnitType } from "@/types/unit"
import wretch from 'wretch'
import { WretchError } from "wretch/resolver"



export default async function fetchUnits({ slug, revalidate }: { slug: string, revalidate: number }): Promise<UnitType[]> {

    const urlObject = new URL(`${process.env.API_URL}/units`)
    if (slug) {
        urlObject.searchParams.append('slug', slug)
    }
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
            console.error(`Error Accourd in fetchCountry. params {slug: ${slug}}`, e?.json, e.message)
            return null;
        })

}