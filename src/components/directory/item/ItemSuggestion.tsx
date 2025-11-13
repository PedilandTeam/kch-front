"use client";

import { useEffect, useState } from "react";
import fetchWrapper from "@/api/fetchWrapper";
import type { City } from "@/schemas/city";
import type { Category } from "@/types/category";
import type { Page } from "@/types/page";
import type { UnitType } from "@/types/unit";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  ItemCard,
  WrapContainer,
} from "@components";

interface ItemSuggestionProps {
  pageId: string;
  countryCode: string;
  unit: UnitType;
  category?: Category;
  city: City;
  basedOn: "category" | "city";
}

export const ItemSuggestion = ({
  category,
  city,
  countryCode,
  basedOn,
  pageId,
}: ItemSuggestionProps) => {
  const [pages, setPages] = useState<Page[] | null>(null);

  useEffect(() => {
    async function load() {
      try {
        let result;

        if (basedOn === "category") {
          result = await fetchWrapper(
            `pages/random?categoryId=${category?.id}&cityId=${city.id}&excludeId=${pageId}`,
          );
        }

        if (basedOn === "city") {
          result = await fetchWrapper(
            `pages/random?cityId=${city?.id}&countryCode=${countryCode}&excludeId=${pageId}`,
          );
        }

        setPages(result || []);
      } catch (err) {
        console.error("Error in ItemSuggestion", err);
      }
    }

    load();
  }, [category?.id, city.id, countryCode, basedOn, pageId]);

  if (!pages || pages.length < 4) return null;

  return (
    <WrapContainer>
      <div className="flex flex-col rounded-xl bg-gradient-to-b from-blue-900 to-blue-700 pb-5">
        <div className="flex items-center justify-between rounded-t-xl px-4 py-4">
          <h3 className="font-semibold text-white">
            {basedOn === "category"
              ? category?.seoTitle
                ? `سایر ${category.seoTitle} در`
                : category?.name
              : "آیتم‌های تصادفی در"}{" "}
            {basedOn === "category"
              ? city?.name
              : city?.name || city?.englishName}
          </h3>
        </div>

        <Carousel
          className="w-full"
          opts={{
            direction: "rtl",
            align: "center",
            loop: true,
            watchSlides: true,
          }}
        >
          <CarouselContent>
            {pages.map((page) => (
              <CarouselItem key={page.id} className="mx-auto max-w-[300px]">
                <ItemCard
                  variant="unit"
                  key={page.id}
                  country={page.country}
                  page={page}
                  carousel
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </WrapContainer>
  );
};
