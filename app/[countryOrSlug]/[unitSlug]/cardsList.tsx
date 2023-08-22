"use client";

import { CircleFlag } from "next-circle-flags";
import { _TXT } from "@/app/text";
import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Rating from "react-rating";
import Image from "next/image";
import Link from "next/link";
import { PageNamespace } from "@/types/page";
import { useEffect, useRef, useState } from "react";
import { usePages } from "@/hooks/swr/usePages";
import { UnitType } from "@/types/unit";
import { CountryNamespace } from "@/types/country";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import CardSkeleton from "./[categorySlug]/categoryList/filter/card.skeleton";
import categoryPathGenerator from "@/utils/categoryPathGenerator";
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

  useEffect(() => {
    setPage(2);
    setPages([]);
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
    perviousPage.current = 0;
    setPageLock(false);
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const [pageLock, setPageLock] = useState(false);
  const perviousPage = useRef<number>(0);
  const [pages, setPages] = useState<PageNamespace.Page[] | []>([]);

  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;


  const { data, isLoading, error, mutate } = usePages(
    page,
    30,
    country.code,
    unit.id,
    parsedSearchParams.city,
    parsedSearchParams.category
  );


  const [canLoadMore, setCanLoadMore] = useState(false)
  const loadMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (data.meta.totalPages - 1 == page) {
      setCanLoadMore(false)
    }
    if (!canLoadMore) return;
    setPage(old => old + 1);
  }



  const [firstLoading, setFirstLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      if (firstLoading) setFirstLoading(false);
    }

  }, [data]);

  useEffect(() => {
    if (!data?.items) return;
    if (error) return;
    if (data.meta.currentPage == data.meta.totalPages) {
      setCanLoadMore(false)
    } else {
      setCanLoadMore(true)
    }
    setPages((old) => [...old, ...data.items]);
  }, [data]);

  if (firstLoading || (isLoading && pages.length == 0) || !parsedSearchParams) {
    return <CardSkeleton />;
  }

  if (data?.meta?.itemCount <= 0 && pages.length == 0) {
    return <p>{_TXT.FILTER.RESAULT_NO}</p>;
  }

  return (
    <div className="list-card min-h-[500px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
        {initPages?.items?.map((page: PageNamespace.Page, index: number) => {
          return <CardListItem key={`unit-preview-item-${page.id}`} variant="unit" page={page} pages={pages} index={index} unit={unit} country={page.country} ref={ref} />
        })}
        {pages.map((page: PageNamespace.Page, index: number) => {
          return <CardListItem key={`unit-preview-item-${page.id}`} variant="unit" page={page} pages={pages} index={index} unit={unit} country={country} ref={ref} />
        })}
      </div>
      <div className={` ${canLoadMore ? "block" : "hidden"} load-more mt-10 text-center`}>
        <a rel="next" onClick={loadMore} className="btn btn-circle p-2">
          <PlusIcon className="w-[24px] h-[24px]" />
        </a>
      </div>
    </div>
  );
};
