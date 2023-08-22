'use client'

import { setCountry } from "@/store/stateSlice";
import { PageNamespace } from "@/types/page";
import { useDispatch } from "react-redux";

type countryUpdater = { pageData: PageNamespace.Page };
export default function({pageData}: countryUpdater) {
    const dis = useDispatch();
    dis(setCountry(pageData?.country?.code));
    return (
        <></>
    )
}