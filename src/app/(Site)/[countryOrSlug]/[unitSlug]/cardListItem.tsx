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
      className="card hover:bg-opacity-30 group carousel-item relative mx-auto w-9/12 rounded-xl border border-gray-200 px-4 py-5 shadow-md transition duration-300 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100"
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
          <div className="my-3 flex h-14 flex-col justify-center">
            <h2 className="group-hover:text-primary _card-title truncate text-center text-xl font-semibold transition duration-300 hover:overflow-visible">
              {page.title}
            </h2>
            {page.subtitle && (
              <h3 className="mt-1 text-center font-medium text-gray-700">
                {page.subtitle}
              </h3>
            )}
          </div>

          <div className="_card-rating flex items-center justify-center">
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
        <h3 className="flex items-center justify-center pt-2 text-[15px] text-gray-500">
          {variant == "category" ? (
            <span className="truncate">{page?.category?.name}</span>
          ) : (
            <Link
              href={categoryPathGenerator(
                country.code,
                page.unit?.slug,
                page.category.slug,
              )}
            >
              <span className="hover:text-primary truncate">
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
