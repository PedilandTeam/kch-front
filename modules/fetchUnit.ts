import { UnitType } from "@/types/unit"
import { AxiosError } from "axios"
import { notFound } from "next/navigation"



export default async function fetchUnits({ slug, revalidate }: { slug: string, revalidate: number }): Promise<UnitType[]> {

    const url = new URL(`${process.env.API_URL}/units`)
    if (slug) {
        url.searchParams.append('slug', slug)
    }
    return await fetch(url, { next: { revalidate } })
        .then(async res => {
            if (!res.ok) {
                if (res.status == 404) {
                    return null
                }
            }
            return await res.json()
        })
        .catch((e: AxiosError) => {
            console.error(`Error Accourd in fetchCountry. params {slug: ${slug}}`)
            return null
        })

}