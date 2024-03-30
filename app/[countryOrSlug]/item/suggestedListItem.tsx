"use client";

import Link from "next/link";
import { PageNamespace } from "@/types/page";
import ItemProfilePicture from "../item/itemProfilePicture";
import {
  Folder,
  MapPinLine,
  Star,
  ShieldWarning,
  Plant,
} from "app/client-packages/phosphor-icons/react";
import Rating from "react-rating";

type cardListItem = {
  page: PageNamespace.Page;
};

export default function SuggestedListItem({ page }: cardListItem) {
  return (
    <div className="relative px-4 py-5 transition duration-300 border border-gray-200 shadow-md w-[280px] sm:w-auto hover:shadow-lg hover:shadow-blue-100 hover:border-blue-200 card rounded-lg bg-stone-50 bg-opacity-30 hover:bg-blue-50 hover:bg-opacity-30 group carousel-item sm:box-border">
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

          <ShieldWarning
            size={26}
            className="absolute transition duration-300 text-stone-300 group-hover:text-orange-400 top-4 right-4"
            weight="duotone"
          />

          <Plant
            size={26}
            className="absolute transition duration-300 text-stone-300 group-hover:text-emerald-600 top-4 left-4"
            weight="duotone"
          />
          <h2 className="my-3 text-xl font-semibold text-center truncate transition duration-300 group-hover:text-primary hover:overflow-visible _card-title">
            {page.title}
          </h2>

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

      <div className="mt-4">
        <div className="flex justify-between text-[15px] border-t border-dashed text-gray-500 group-hover:border-blue-200 pt-2">
          <div className="flex items-center">
            <MapPinLine
              size={18}
              weight="light"
              className="ml-1 text-primary"
            />
            <span className="truncate">{page?.city?.name}</span>
          </div>
          <div className="flex items-center">
            <Folder size={18} weight="light" className="ml-1 text-primary" />
            <Link href={"#"} className="truncate hover:text-primary">
              {page?.category?.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
