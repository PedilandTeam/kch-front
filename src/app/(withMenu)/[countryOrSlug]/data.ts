import fetchWrapper from "@/api/fetchWrapper";
import type { Country } from "@/schemas";
import type { Category } from "@/types/category";
import type { GetPagesResponse, Page } from "@/types/page";
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
    const isCountryCode = /^[a-zA-Z]{2,8}$/.test(countryOrSlug);

    // اگر کشور نیست، مستقیم برو سراغ page
    if (!isCountryCode) {
      const pageRes = await fetchWrapper<GetPagesResponse>("pages", {
        filters: { page: 1, limit: 1, slug: countryOrSlug },
        tags: ["page"],
        revalidate: REVALIDATE,
      });

      const item = pageRes?.items?.[0];
      return item ? { type: "item", pageData: item } : null;
    }

    // اگر کشور بود، اول کشور و دسته‌ها را بگیر
    const [countries, categories] = await Promise.all([
      fetchWrapper<Country[]>("countries", {
        filters: { code: countryOrSlug },
        tags: ["country"],
        revalidate: REVALIDATE,
      }),

      fetchWrapper<Category>("categories", {
        filters: { page: 1, limit: 300 },
        tags: ["category"],
        revalidate: REVALIDATE,
      }),
    ]);

    const currentCountry = countries?.[0];

    if (currentCountry) {
      return { type: "country", currentCountry, categories };
    }

    // اگر به هر دلیل کشور نبود، به عنوان page تست کن
    const pageRes = await fetchWrapper<GetPagesResponse>("pages", {
      filters: { page: 1, limit: 1, slug: countryOrSlug },
      tags: ["page"],
      revalidate: REVALIDATE,
    });

    const item = pageRes?.items?.[0];

    return item ? { type: "item", pageData: item } : null;
  },
);
