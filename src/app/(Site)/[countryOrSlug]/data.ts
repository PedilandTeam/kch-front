// app/(Site)/[countryOrSlug]/data.ts
import { cache } from "react";
import fetchWrapper from "@/modules/fetchWrapper";
import { CategoryNamespace } from "@/types/category";
import { CountryNamespace } from "@/types/country";
import { PageNamespace } from "@/types/page";

export type RouteData =
  | {
      type: "country";
      currentCountry: CountryNamespace.GET;
      categories: CategoryNamespace.GET;
    }
  | { type: "item"; pageData: NonNullable<PageNamespace.GET["items"]>[number] }
  | null;

const REVALIDATE =
  Number(process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS) || 2000;

export const getRouteData = cache(
  async (countryOrSlug: string): Promise<RouteData> => {
    const [countries, categories] = await Promise.all([
      fetchWrapper<CountryNamespace.GET[]>("countries", {
        filters: { code: countryOrSlug },
        tags: ["country", "page"],
        revalidate: REVALIDATE,
      }),
      fetchWrapper<CategoryNamespace.GET>("categories", {
        filters: { page: 1, limit: 300 },
        tags: ["country", "page"],
        revalidate: REVALIDATE,
      }),
    ]);

    const currentCountry = countries?.[0];

    if (currentCountry) {
      return { type: "country", currentCountry, categories };
    }

    const pageRes = await fetchWrapper<PageNamespace.GET>("pages", {
      filters: { page: 1, limit: 1, slug: countryOrSlug },
      tags: ["country", "page"],
      revalidate: REVALIDATE,
    });

    const item = pageRes?.items?.[0];

    return item ? { type: "item", pageData: item } : null;
  },
);
