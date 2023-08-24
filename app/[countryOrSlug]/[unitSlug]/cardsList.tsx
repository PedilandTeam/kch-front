"use client";

import { _TXT } from "@/app/text";
import { PageNamespace } from "@/types/page";
import { useEffect, useRef, useState } from "react";
import { usePages } from "@/hooks/swr/usePages";
import { UnitType } from "@/types/unit";
import { CountryNamespace } from "@/types/country";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import CardSkeleton from "./[categorySlug]/categoryList/filter/card.skeleton";
import Pagination from "./pagination/pagination";
import CardListItem from "./cardListItem";

type CardsListType = {
  unit: UnitType;
  country: CountryNamespace.GET;
  initPages: PageNamespace.GET
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = ({ unit, country, initPages }: CardsListType) => {
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);


  const { data, isLoading, error, mutate } = usePages(
    pageNumber,
    30,
    country.code,
    unit.id,
    parsedSearchParams.city,
    parsedSearchParams.category
  );

  const [firstLoading, setFirstLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (firstLoading) setFirstLoading(false);
    }

  }, [data]);

  useEffect(() => {
    const pageInSearchParams = searchParams.get("page");
    if (!pageInSearchParams) return;
    setPageNumber(+pageInSearchParams)
}, [searchParams])
  
  if (data?.meta?.itemCount <= 0 && data?.items?.length == 0) {
    return <p>{_TXT.FILTER.RESAULT_NO}</p>;
  }
  
  if (isLoading) {
    return <CardSkeleton />;
  }

  if(!pageNumber){
    return <p>Loading ...</p>
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="list-card min-h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
          {/* {
            page == 1
              ?
              initPages?.items?.map((page: PageNamespace.Page, index: number) => {
                return <CardListItem key={`unit-preview-item-${page.id}`} variant="unit" page={page} pages={pages} index={index} unit={unit} country={page.country} ref={ref} />
              })
              :
              null
          } */}
          {data?.items?.map((page: PageNamespace.Page, index: number) => {
            return <CardListItem key={`unit-preview-item-${page.id}`} variant="unit" page={page} pages={data?.items} index={index} unit={unit} country={country}/>
          })}
        </div>
        {/* <div className={` ${canLoadMore ? "block" : "hidden"} load-more mt-10 text-center`}>
        <a rel="next" onClick={loadMore} className="btn btn-circle p-2">
          <PlusIcon className="w-[24px] h-[24px]" />
        </a>
      </div>] */}
      </div>

      <Pagination pages={initPages} />

    </div>

  );
};
