import { PageNamespace } from "@/types/page";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import CardListItem from "../cardListItem";
import Pagination from "../pagination/pagination";
import { API_ROUTES } from "@/routes";
import fetchWrapper from "@/modules/fetchWrapper";

type CardsListType = {
  country: CountryNamespace.GET;
  pageNumber?: number;
  city?: number | number[];
  category?: CategoryNamespace.category;
  search?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = async ({
  category,
  country,
  pageNumber,
  city,
  search,
}: CardsListType) => {
  let pages: PageNamespace.GET | undefined;
  let isNotFound = false;

  try {

    pages = await fetchWrapper('pages', {
      filters: {
        page: pageNumber ? pageNumber : 1,
        limit: 24,
        countryCode: country.code,
        cityIds: city,
        categoryIds: category?.id,
        search,
      },
      tags: ["country", 'page'],
      revalidate: +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    })
  } catch (e) {
    isNotFound = true;
  }

  if (pages && pages.items.length == 0) {
    isNotFound = true;
  }

  if (isNotFound) {
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center">
        <h3 className="text-2xl font-bold">
          با فیلترهای انتخابی چیزی یافت نشد :)
        </h3>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-[500px] w-full _cat-list-card">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-5">
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
