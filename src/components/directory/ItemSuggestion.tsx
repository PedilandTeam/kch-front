import fetchWrapper from "@/api/fetchWrapper";
import type { City } from "@/schemas/city";
import type { Category } from "@/types/category";
import type { Page } from "@/types/page";
import type { UnitType } from "@/types/unit";
import { AxiosError } from "axios";

import {
  Carousel,
  CarouselContent,
  CarouselItem, ItemCard
} from "@/components/index";

interface ItemSuggestionProps {
  pageId: string;
  countryCode: string;
  unit: UnitType;
  category?: Category;
  city: City;
  basedOn: "category" | "city";
}

export const ItemSuggestion = async ({
  category,
  city,
  countryCode,
  basedOn,
  pageId,
}: ItemSuggestionProps) => {
  let pages: Page[] | undefined = undefined;

  try {
    if (basedOn === "category") {
      pages = await fetchWrapper(
        `pages/random?categoryId=${category?.id}&cityId=${city.id}&excludeId=${pageId}`,
        {
          revalidate:
            +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
          tags: ["country", "page"],
        },
      );
    }

    if (basedOn === "city") {
      pages = await fetchWrapper(
        `pages/random?cityId=${city?.id}&countryCode=${countryCode}&excludeId=${pageId}`,
        {
          revalidate:
            +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
          tags: ["country", "page"],
        },
      );
    }
  } catch (e: AxiosError | any) {
    console.log(e?.response?.data);
    console.log(e);

    return null;
  }

  if (!pages) {
    return null;
  }

  if (pages.length >= 4)
    return (
      <div className="my-10">
        <h3 className="mb-3 text-center font-semibold">
          {basedOn === "category"
            ? category?.seoTitle
              ? `سایر ${category.seoTitle} در`
              : category?.name
            : "آیتم‌های تصادفی در"}{" "}
          {basedOn === "category"
            ? city?.name
            : city?.name || city?.englishName}
        </h3>

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
            {pages?.map((page) => (
              <CarouselItem key={page.id} className="mx-auto max-w-[300px]">
                <ItemCard
                  variant="unit"
                  key={page.id}
                  country={page.country}
                  page={page}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
};
