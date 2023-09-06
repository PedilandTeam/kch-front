"use client"

import { usePages } from "@/hooks/swr/usePages"
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react"
import ItemProfilePicture from "../item/itemProfilePicture";

type CountryPagesSearch = {
    countryCode: string;
}

export default ({countryCode}: CountryPagesSearch) => {


    const [search, setSearch] = useState<string>()

    const {data: pages, isLoading, error} = usePages(1, search ? 10 : 5, countryCode, undefined, undefined, undefined, search ? search: undefined)

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <div className="dropdown search-sec mt-4 mb-5 w-full px-4 sm:px-0 sm:w-1/2 mx-auto block">
            <input
                onChange={inputChangeHandler}
                type="text"
                placeholder="اینجا تایپ کن"
                className="input rounded-full text-center h-[54px] text-[18px] font-medium w-full opacity-75 hover:opacity-[.85] focus:opacity-[.85]"
            />
            {
                pages &&
                <ul tabIndex={0} className="sm:w-1/2 lg:w-full dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                    {
                        pages.items?.map(page => {
                            return (
                                <li>
                                    <Link className="flex justify-start" href={`/${page.slug}`}>
                                        <ItemProfilePicture pageData={page} height={30} width={30} />
                                        <p>{page.title}</p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )

}