import { CircleFlag } from "next-circle-flags";
import { FolderIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Rating from "react-rating";
import Image from "next/image";
import Link from "next/link";
import categoryPathGenerator from "@/utils/categoryPathGenerator";
import { PageNamespace } from "@/types/page";
import { forwardRef, LegacyRef, RefObject } from "react";
import { CountryNamespace } from "@/types/country";
import { UnitType } from "@/types/unit";
import ItemProfilePicture from "../item/itemProfilePicture";


type cardListItem = {
    page: PageNamespace.Page,
    country: CountryNamespace.GET,
    variant: "category" | "unit"
}

export default function ({ page, country, variant }: cardListItem) {

    return (

        <div
            key={`cardlist-page-index-${page.slug}`}
            className="card rounded-lg border border-gray-100 shadow-sm hover:shadow hover:border-gray-200 bg-slate-50"
        >
            <div className="flex">
                <Link href={`/${page.slug}`}>
                    <ItemProfilePicture height={100} width={100} pageData={page} className={"rounded-full m-3 ml-0 w-[100px] h-[100px]"} />
                </Link>
                <div className="card-body p-4">
                    <div className="flex card-header items-center">
                        {/* <OpenHours /> */}
                        <Link href={`/${page.slug}`}>
                            <h2 className="text-slate-700 text-[17px] font-semibold mt-1 hover:text-pink-800">
                                {page.title}
                            </h2>
                        </Link>
                    </div>

                    <div className="flex mt-1 card-rating">
                        {/* @ts-ignore */}
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask w-[20px] h-[20px] mask-star-2 bg-gray-200" />
                            <input type="radio" name="rating-2" className="mask w-[20px] h-[20px] mask-star-2 bg-gray-200" />
                            <input type="radio" name="rating-2" className="mask w-[20px] h-[20px] mask-star-2 bg-gray-200" />
                            <input type="radio" name="rating-2" className="mask w-[20px] h-[20px] mask-star-2 bg-gray-200" />
                            <input type="radio" name="rating-2" className="mask w-[20px] h-[20px] mask-star-2 bg-gray-200" />
                        </div>
                        {/* <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                      (0 نظر)
                    </span> */}
                    </div>

                    <div className="flex w-full card-tools mb-1 text-sm text-gray-700">
                        <div className="flex ml-5">
                            <CircleFlag
                                alt={`پرچم کشور ${country.name}`}
                                width={4}
                                height={4}
                                countryCode={page?.country?.code}
                                className="w-4 ml-2"
                                title={page?.country?.name}
                            />
                            <p className=" truncate">{page?.city?.name}</p>
                        </div>
                        <div className="flex justify-center content-center">
                            <FolderIcon className="w-4 ml-1 text-gray-400" />
                            {
                                variant == "category" ? (
                                    <span>{page?.category?.name}</span>
                                ) :
                                    <Link
                                        href={categoryPathGenerator(
                                            country.code,
                                            page.unit?.slug,
                                            page.category.slug
                                        )}
                                    >
                                        <span>{page?.category?.name}</span>
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}