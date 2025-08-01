"use client";

import Link from "next/link";
import categoryPathGenerator from "@/utils/categoryPathGenerator";
import { PageNamespace } from "@/types/page";
import { CountryNamespace } from "@/types/country";
import ItemProfilePicture from "../item/itemProfilePicture";
import { Star } from "@phosphor-icons/react/dist/ssr";
import Rating from "react-rating";
import OrangeBadge from "@/components/badges/orange.badge";
import BlueBadge from "@/components/badges/blue.badge";

type cardListItem = {
  page: PageNamespace.Page;
  country: CountryNamespace.GET;
  variant: "category" | "unit";
};

export default function CardListItem({ page, country, variant }: cardListItem) {
  return (
    <div
      className="relative w-9/12 px-4 py-5 mx-auto transition duration-300 border border-gray-200 shadow-md sm:shadow-gray-100 sm:mx-0 sm:w-auto hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 card rounded-xl hover:bg-blue-50 hover:bg-opacity-30 group carousel-item sm:box-border"
      key={`cardlist-page-index-${page.slug}`}
    >
      <Link href={`/${page.slug}`}>
        <div>
          <figure>
            <ItemProfilePicture
              height={140}
              width={140}
              pageData={page}
              className={"rounded-full"}
            />
          </figure>

          <BlueBadge enable={!!page.business} absoluteMode />
          <OrangeBadge enable={!page.business} absoluteMode />

          {/* <Plant
            size={26}
            className="absolute transition duration-300 text-stone-300 group-hover:text-emerald-600 top-4 left-4"
            weight="duotone"
          /> */}
          <div className="flex flex-col justify-center my-3 h-14">
            <h2 className="text-xl font-semibold text-center truncate transition duration-300 group-hover:text-primary hover:overflow-visible _card-title">
              {page.title}
            </h2>
            {page.subtitle && (
              <h3 className="mt-1 font-medium text-center text-gray-700">
                {page.subtitle}
              </h3>
            )}
          </div>

          <div className="flex items-center justify-center _card-rating">
            {/* @ts-ignore */}
            <Rating
              initialRating={0}
              direction={"rtl"}
              readonly={true}
              className="flex"
              emptySymbol={
                <Star size={26} weight="duotone" className="text-stone-300" />
              }
              fullSymbol={
                <Star size={26} weight="fill" className="text-yellow-400" />
              }
            />
          </div>
        </div>
      </Link>

      <div className="mt-4 border-t border-dashed group-hover:border-blue-200">
        <h3 className="flex items-center justify-center text-[15px] text-gray-500 pt-2">
          {variant == "category" ? (
            <span className="truncate">{page?.category?.name}</span>
          ) : (
            <Link
              href={categoryPathGenerator(
                country.code,
                page.unit?.slug,
                page.category.slug
              )}
            >
              <span className="truncate hover:text-primary">
                {page?.category?.name}
              </span>
            </Link>
          )}
          <span className="mx-1">در</span>
          <span className="truncate">{page?.city?.name}</span>
        </h3>
      </div>
    </div>
  );
}
