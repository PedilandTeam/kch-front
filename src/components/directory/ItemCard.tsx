"use client";

import Link from "next/link";
import categoryPathGenerator from "@/utils/categoryPathGenerator";
import type { Page } from "@/types/page";
import ItemProfilePicture from "../../app/[countryOrSlug]/item/itemProfilePicture";
import { StarIcon } from "@phosphor-icons/react";
import Rating from "react-rating";
import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";

interface ItemCardProps {
  page: Page;
  country: Country;
  variant: "category" | "unit";
  className?: string;
}

export const ItemCard = ({
  page,
  country,
  variant,
  className,
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-lg border border-blue-100 bg-blue-50/50 p-4",
        className,
      )}
      key={`cardlist-page-index-${page.slug}`}
    >
      {/* <BlueBadge enable={!!page.business} absoluteMode />
      <OrangeBadge enable={!page.business} absoluteMode /> */}

      <div>
        <Link href={`/${page.slug}`}>
          <ItemProfilePicture
            height={60}
            width={60}
            pageData={page}
            className={"rounded-full"}
          />
        </Link>
      </div>

      <div className="flex flex-col items-start space-y-1.5">
        <div className="flex h-11 w-full flex-col items-center justify-center">
          <h2 className="text-primary text-[15px] font-semibold">
            {page.title}
          </h2>
          {page.subtitle && (
            <h3 className="line-clamp-1 text-sm text-blue-800">
              {page.subtitle}
            </h3>
          )}
        </div>

        <div className="flex w-full items-center justify-center">
          {/* @ts-ignore */}
          {/* <Rating
            initialRating={0}
            direction={"rtl"}
            readonly={true}
            className="leading-0"
            emptySymbol={
              <StarIcon size={20} weight="duotone" className="text-stone-300" />
            }
            fullSymbol={
              <StarIcon size={20} weight="fill" className="text-yellow-400" />
            }
          /> */}
        </div>

        <h4 className="text-muted-foreground flex w-full items-center justify-center text-[13px]">
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
        </h4>
      </div>
    </div>
  );
};
