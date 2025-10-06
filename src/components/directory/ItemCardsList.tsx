import fetchWrapper from "@/api/fetchWrapper";
import type { Country } from "@/schemas/country";
import type { Category } from "@/types/category";
import type { GetPagesResponse, Page } from "@/types/page";

import { ItemCard, ListPagination } from "@/components/index";

interface ItemCardsListProps {
  country: Country;
  pageNumber?: number;
  city?: number | number[];
  category?: Category;
  search?: string;
}

export const ItemCardsList = async ({
  category,
  country,
  pageNumber,
  city,
  search,
}: ItemCardsListProps) => {
  let pages: GetPagesResponse | undefined;
  let isNotFound = false;

  try {
    pages = await fetchWrapper("pages", {
      filters: {
        page: pageNumber ? pageNumber : 1,
        limit: 24,
        countryCode: country.code,
        cityIds: city,
        categoryIds: category?.id,
        search,
      },
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    console.log("pages", pages);
  } catch (e) {
    isNotFound = true;
  }

  if (pages && pages.items.length == 0) {
    isNotFound = true;
  }

  return (
    <div className="_item-cards-list flex flex-col gap-4 px-4">
      <div className="space-y-4">
        {pages?.items?.map((page: Page) => {
          return (
            <ItemCard
              key={`unit-preview-item-${page.id}`}
              variant="unit"
              page={page}
              country={country}
            />
          );
        })}
      </div>
      {pages?.meta?.totalPages! > 1 ? <ListPagination pages={pages!} /> : null}
    </div>
  );
};
