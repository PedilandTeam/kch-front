import { API_ROUTES } from "@/routes";
import type { Country } from "@/schemas";
import type { Category, GetCategoryResponse } from "@/types/category";
import type { Page } from "@/types/page";
import type { UnitType } from "@/types/unit";
import type { MetadataRoute } from "next";

function lastModifiedGenerator() {
  const currentDate = new Date();
  const randomHours = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  currentDate.setHours(currentDate.getHours() - randomHours);
  return currentDate;
}

const baseUrl = process.env.FRONT_URL;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let countriesSiteMap: MetadataRoute.Sitemap = [],
    unitsSiteMap: MetadataRoute.Sitemap = [],
    categoriesSiteMap: MetadataRoute.Sitemap = [],
    pagesSiteMap: MetadataRoute.Sitemap = [];
  try {
    const countries: Country[] = await (
      await API_ROUTES.COUNTRIES.GET_ALL(1, 100)
    ).json();
    countriesSiteMap = countries.map((country: Country) => {
      return {
        url: `${baseUrl}/${country.code}`,
        lastModified: lastModifiedGenerator(),
      };
    });

    const units: UnitType[] = await (
      await API_ROUTES.UNITS.GET_ALL(100)
    ).json();
    unitsSiteMap = [];
    countries.forEach((country: Country) => {
      return units.forEach((unit: UnitType) => {
        unitsSiteMap.push({
          url: `${baseUrl}/${country.code}/${unit.slug}`,
          lastModified: lastModifiedGenerator(),
        });
      });
    });

    const categoriesGet: GetCategoryResponse = await (
      await API_ROUTES.CATEGOREIS.GET_ALL(1, 300)
    ).json();
    const categories: Category[] = categoriesGet.items;
    categoriesSiteMap = [];
    countries.forEach((country: Country) => {
      return categories.forEach((category) => {
        categoriesSiteMap.push({
          url: `${baseUrl}/${country.code}/${category.unit.slug}/${category.slug}`,
          lastModified: lastModifiedGenerator(),
        });
      });
    });

    let page: number = 1;
    let pageEnded = false;
    const pagesGenerator = async (page: number) =>
      await (await API_ROUTES.PAGES.GET_ALL(page, 100, {})).json();
    while (!pageEnded) {
      const pagesGet = await await pagesGenerator(page);
      const pages = pagesGet.items;
      const meta = pagesGet.meta;

      pages.forEach((page: Page) => {
        pagesSiteMap.push({
          url: `${baseUrl}/${encodeURIComponent(page.slug)}`,
          lastModified: page.updateDate,
        });
      });

      if (page == meta.totalPages) {
        break;
      } else {
        page++;
      }
    }
  } catch (err) {
    console.error("Error in sitemap", err);
  }

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/about`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/adsclub`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/business-center`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModifiedGenerator(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastModifiedGenerator(),
    },
  ];

  return [
    ...staticRoutes,
    ...countriesSiteMap,
    ...unitsSiteMap,
    ...categoriesSiteMap,
    ...pagesSiteMap,
  ];
}
