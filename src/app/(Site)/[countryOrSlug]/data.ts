// app/(Site)/[countryOrSlug]/data.ts

import fetchWrapper from "@/modules/fetchWrapper";
import { Category } from "@/types/category";
import { Country } from "@/types/country";
import { GetPagesResponse, Page } from "@/types/page";
import { cache } from "react";

export type RouteData =
  | {
      type: "country";
      currentCountry: Country;
      categories: Category;
    }
  | { type: "item"; pageData: Page }
  | null;

const REVALIDATE =
  Number(process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS) || 2000;

export const getRouteData = cache(
  async (countryOrSlug: string): Promise<RouteData> => {
    const [countries, categories] = await Promise.all([
      fetchWrapper<Country[]>("countries", {
        filters: { code: countryOrSlug },
        tags: ["country", "page"],
        revalidate: REVALIDATE,
      }),
      fetchWrapper<Category>("categories", {
        filters: { page: 1, limit: 300 },
        tags: ["country", "page"],
        revalidate: REVALIDATE,
      }),
    ]);

    const currentCountry = countries?.[0];

    if (currentCountry) {
      return { type: "country", currentCountry, categories };
    }

    const pageRes = await fetchWrapper<GetPagesResponse>("pages", {
      filters: { page: 1, limit: 1, slug: countryOrSlug },
      tags: ["country", "page"],
      revalidate: REVALIDATE,
    });

    const item = pageRes?.items?.[0];

    return item ? { type: "item", pageData: item } : null;
  },
);
