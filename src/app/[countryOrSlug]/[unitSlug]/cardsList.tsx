import { PageNamespace } from "@/types/page";
import { UnitType } from "@/types/unit";
import { Country } from "@/types/country";
import Pagination from "./pagination/pagination";
import CardListItem from "./cardListItem";
import { Suspense } from "react";
import Loading from "./_loading";
import { API_ROUTES } from "@/routes";
import fetchWrapper from "@/api/fetchWrapper";

type CardsListType = {
  unit: UnitType;
  country: Country;
  // pages: PageNamespace.GET;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string;
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

export const CardsList = async ({
  unit,
  country,
  category,
  pageNumber,
  city,
  search,
}: CardsListType) => {
  let isNotFound = false;
  let pages: PageNamespace.GET | undefined = undefined;

  try {
    pages = await fetchWrapper<PageNamespace.GET>("pages", {
      filters: {
        page: pageNumber ? pageNumber : 1,
        limit: 24,
        countryCode: country.code,
        unitId: unit.id,
        categoryIds: category,
        cityIds: city,
        search,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
  } catch (e: any) {
    isNotFound = true;
  }

  if (pages && pages.items.length == 0) {
    isNotFound = true;
  }

  if (isNotFound) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <h3 className="text-lg font-medium text-gray-500">
          موردی مطابق با فیلترهای انتخابی یافت نشد.
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="_unit-list-card min-h-[500px] w-full">
        <div className="grid grid-cols-1 gap-y-4">
          {pages?.items?.map((page: PageNamespace.Page, index: number) => {
            return (
              <CardListItem
                key={`unit-preview-item-${page.id}`}
                variant="unit"
                page={page}
                country={country}
              />
            );
          })}
        </div>
      </div>
      {pages?.meta?.totalPages! > 1 ? <Pagination pages={pages!} /> : null}
    </>
  );
};
