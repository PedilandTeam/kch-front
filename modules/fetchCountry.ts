import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";



export default async function fetchCountry({ code, revalidate }: { code: string, revalidate: number }): Promise<CountryNamespace.GET> {


    const url = new URL(`${process.env.API_URL}/countries`)
    if (code) {
        url.searchParams.append('code', code)
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
            console.error(`Error Accourd in fetchCountry. params {code: ${code}}`)
            return null
        })

}