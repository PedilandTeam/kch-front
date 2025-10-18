"use client";

import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import type { Page } from "@/types/page";
import categoryPathGenerator from "@/utils/categoryPathGenerator";
import Link from "next/link";

import { Card, CardContent, ItemAvatar, ItemBadge } from "@components";
import { FolderSimpleStarIcon } from "@phosphor-icons/react";

interface ItemCardProps {
  page: Page;
  carousel?: boolean;
  country: Country;
  variant: "category" | "unit";
  className?: string;
}

export const ItemCard = ({
  page,
  country,
  variant,
  carousel,
}: ItemCardProps) => {
  return (
    <Card
      className={cn(
        "shadow-none",
        carousel
          ? "border-none bg-white px-3 py-4"
          : "border-2 border-gray-200/50 bg-gray-50/95 px-4 py-5",
      )}
      key={`cardlist-page-index-${page.slug}`}
    >
      <CardContent className="p-0">
        <div className={cn("flex items-center gap-3", carousel && "h-16")}>
          <div className="shrink-0">
            <Link href={`/${page.slug}`}>
              <ItemAvatar
                pageData={page}
                className={cn(carousel ? "size-[60px]" : "size-[70px]")}
              />
            </Link>
          </div>
          <div className="flex flex-col">
            <h2
              className={cn(
                "flex items-center gap-1 text-[15px] font-semibold",
                !carousel && "mb-1",
              )}
            >
              <ItemBadge pageData={page} size="sm" />

              <Link
                className="text-primary hover:text-secondary"
                href={`/${page.slug}`}
              >
                {page.title}
              </Link>
            </h2>
            {page.subtitle && (
              <h3
                className={cn(
                  "text-primary line-clamp-1 text-sm",
                  carousel ? "mb-0.5" : "mb-2",
                )}
              >
                {page.subtitle}
              </h3>
            )}

            <div
              className={cn(
                "text-muted-foreground flex items-center",
                carousel ? "text-[13px]" : "text-sm",
              )}
            >
              {!carousel && (
                <FolderSimpleStarIcon
                  size={18}
                  className="ml-1"
                  weight="duotone"
                />
              )}

              <div className="flex items-center justify-center overflow-hidden">
                {variant == "category" ? (
                  <span className="truncate">{page?.category?.name}</span>
                ) : (
                  <Link
                    href={categoryPathGenerator(
                      country.code,
                      page.unit?.slug,
                      page.category.slug,
                    )}
                    className="hover:text-primary line-clamp-1 text-wrap"
                  >
                    {page?.category?.name}
                  </Link>
                )}
                <span className="mx-1">در</span>
                <span className="truncate">{page?.city?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
