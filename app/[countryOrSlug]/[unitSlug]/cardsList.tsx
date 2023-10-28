import { PageNamespace } from "@/types/page";
import { UnitType } from "@/types/unit";
import { CountryNamespace } from "@/types/country";
import Pagination from "./pagination/pagination";
import CardListItem from "./cardListItem";
import { Suspense } from "react";
import Loading from "./_loading";
import { API_ROUTES } from "@/routes";

type CardsListType = {
  unit: UnitType;
  country: CountryNamespace.GET;
  // pages: PageNamespace.GET;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = async ({ unit, country, category, pageNumber, city, search }: CardsListType) => {


  let isNotFound = false
  let pages: PageNamespace.GET | undefined = undefined


  try{
    pages = await (await API_ROUTES.PAGES.GET_ALL(pageNumber ? pageNumber : 1, 30, {countryCode: country.code, unitId: unit.id, categoryIds: category, cityIds: city, search})).json()
  }catch(e: any){
    isNotFound = true
  }

  if(pages && pages.items.length == 0){
    isNotFound = true
  }

  if(isNotFound){
    return (
      <div className="w-full min-h-[60vh] flex justify-center items-center">
        <h3 className="text-lg font-medium text-gray-500">موردی مطابق با فیلترهای انتخابی یافت نشد.</h3>
      </div>
    )
  }

  return (
      <div className="flex flex-col justify-center items-center">
        <div className="list-card min-h-[500px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-6">
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
        {
          pages?.meta?.totalPages! > 1
          ?
          <Pagination pages={pages!} />
          :
          null
        }
      </div>
  );
};
