'use client'
import { useHeader } from "@/store/useHeader";
import { PageNamespace } from "@/types/page";
import { useEffect } from "react";

type countryUpdater = { pageData: PageNamespace.Page };
export default function CountryUpdater({pageData}: countryUpdater) {
    const {setCountryCode} = useHeader();

    useEffect(() => {
        setCountryCode(pageData?.country?.code);
        return () => {
            setCountryCode('')
        }
    }, [pageData?.country?.code])
    return (
        <></>
    )
}