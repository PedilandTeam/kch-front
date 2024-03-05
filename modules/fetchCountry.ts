import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import wretch from 'wretch'
import { WretchError } from "wretch/resolver";


export default async function fetchCountry({ code, revalidate }: { code: string, revalidate: number }): Promise<CountryNamespace.GET[]> {
    const urlObject = new URL(`${process.env.API_URL}/countries`)
    if (code) {
        urlObject.searchParams.append('code', code)
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
            console.error(`Error Accourd in fetchCountry. params {code: ${code}}`, e?.json, e.message)
            return null;
        })
}