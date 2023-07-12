"use client"
import { MENU } from "@/components/allTexts"
import { UNITS_LIST_ARRAY } from "@/routes"
import { CategoryNamespace } from "@/types/category"
import { CountryNamespace } from "@/types/country"
import { UnitType } from "@/types/unit"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"



type CountryCategoriesItemsProps = {
    recentlyUpdatedCategories: CategoryNamespace.MOST_USED
    currentCountry: CountryNamespace.GET
}
export default function CountryCategoriesItems({ recentlyUpdatedCategories, currentCountry }: CountryCategoriesItemsProps) {

    const units = UNITS_LIST_ARRAY

    const [activeTab, setActive] = useState<number>(1)
    const activeTabChangeHandler = (value: number) => {
        setActive(value)
    }

    type emptyUnitsType = {
        unit: string,
        childs: number
    }
    const [emptyUnits, setEmptyUnits] = useState<emptyUnitsType[] | []>([])

    return (
        <>
            {
                units.map(unit => {
                    if(recentlyUpdatedCategories[`${unit.id}`].length == 0){
                        return;
                    }
                    return (
                        <a onClick={() => activeTabChangeHandler(unit.id)} key={`unit-${unit.id}`} className={`tab tab-bordered border-b-[3px] font-medium h-[46px] text-base ${activeTab == unit.id ? "tab-active border-orange-300" : ""} `}>
                            {unit.name}
                        </a>
                    )

                })
            }
            <div className="tabs">
            </div>
            <div className="content mt-6 grid sm:grid-cols-6 gap-4 mx-3 sm:mx-0">
                {
                    recentlyUpdatedCategories[`${activeTab}`].map((category, index) => {
                        return (
                            <Link key={"country-category" + category.id} href={`/${currentCountry.code}/${category.slug}`}>
                                <div key={`${category.id}${index}`} className="cat-card group">
                                    <Image
                                        src="/img/icon/cat-restaurant.svg"
                                        width="34"
                                        height="34"
                                        alt="Restaurant Icon"
                                    />
                                    <div className="w-full text-center my-3">{category.name}</div>
                                    <span className="tracking-[1px] text-sm group-hover:font-semibold">
                                    {category.pageCount}
                                </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </>
    )

}