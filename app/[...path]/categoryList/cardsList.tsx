"use client";
import { Card, CardBody } from "@chakra-ui/react";

import { StarIcon } from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY, COUNTRY } from "../../../components/allTexts";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { OpenHours } from "../../../components/elements/openhours";
import { Country, PageNamespace } from "@/types/page";
import { useEffect, useRef, useState } from "react";
import { usePathSeparatorType } from "@/hooks/usePathSeparator";
import { usePages } from "@/hooks/swr/usePages";
import { UnitType } from "@/types/unit";
import { CountryNamespace } from "@/types/country";
import { useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useIntersectionObserver } from "react-intersection-observer-hook";
import ContentLoader from "react-content-loader";
import { FolderIcon } from "@heroicons/react/24/outline";
import { CategoryNamespace } from "@/types/category";

type CardsListType = {
  paths: usePathSeparatorType;
  category: CategoryNamespace.category;
  country: CountryNamespace.GET;
};

type ParsedSearchParamsType = {
  city?: string[] | string;
  category?: string[] | string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CardsList = ({ paths, category, country }: CardsListType) => {
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParamsType>({});
  const searchParams = useSearchParams();

  useEffect(() => {
    setPage(1);
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
  const [pages, setPages] = useState<PageNamespace.GET[] | []>([]);

  const [ref, { entry }] = useIntersectionObserver();
  const isVisible = entry && entry.isIntersecting;

  useEffect(() => {
    if (!isVisible) return;
    if (pageLock) return;
    if (page == perviousPage.current) return;
    perviousPage.current = page;
    setPage((old) => old + 1);
  }, [isVisible]);

  const { data, isLoading, error, mutate } = usePages(
    page,
    30,
    country.code,
    unit.id,
    parsedSearchParams.city,
    parsedSearchParams.category
  );
  useEffect(() => {
    if (!data?.items) return;
    if (error) return;
    if (data.meta.itemCount <= 0) {
      setPageLock(true);
      return;
    } else {
      setPageLock(false);
    }
    setPages((old) => [...old, ...data.items]);
  }, [data]);

  if ((isLoading && pages.length == 0) || !parsedSearchParams) {
    return (
      <>
        {
          Array.from({ length: 12 }).map((skeleton: any, index) => {
            return (
              <ContentLoader
                key={index}
                speed={2}
                width={417}
                height={126}
                viewBox="0 0 417 126"
                backgroundColor="#ededed"
                foregroundColor="#e0e0e0"
              // {...props}
              >
                <rect x="55" y="12" rx="0" ry="0" width="220" height="16" />
                <rect x="55" y="53" rx="0" ry="0" width="220" height="14" />
                <rect x="55" y="92" rx="0" ry="0" width="220" height="16" />
                <circle cx="355" cy="62" r="50" />
              </ContentLoader>
            );
          })
        }
      </>
    )
  }

  if (data?.meta?.itemCount <= 0 && pages.length == 0) {
    return <p>با فیلتر اعمال شده نتیجه ای یافت نشد</p>;
  }

  return (

    <div className="list-card grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-4">
      {pages.map((page: PageNamespace.GET, index: number) => {
        return (
          <Card
            ref={index == pages.length - 1 ? ref : null}
            key={page.slug + index}
            overflow="hidden"
            variant={"outline"}
            className="border-gray-200 border-r-[3px] rounded-tr-none rounded-br-none hover:border-gray-300 hover:border-r-slate-500 hover:shadow"
          >
            <div className="flex">
              <Link href={`/${page.slug}`}>
                <Image
                  alt="لیست"
                  src={"/img/list/logo/logo-placeholder.webp"}
                  width={100}
                  height={100}
                  className="rounded-full m-3 ml-0 w-[100px] h-[100px]"
                />
              </Link>
              <CardBody padding={3}>
                <div className="flex card-header items-center">
                  {/* <OpenHours /> */}
                  <Link href={`/${page.slug}`}>
                    <h2 className="text-slate-700 text-[17px] font-semibold mt-1 hover:text-pink-800">
                      {page.title}
                    </h2>
                  </Link>
                </div>

                <div className="flex my-2 card-rating">
                  {/* @ts-ignore */}
                  <Rating
                    readonly
                    initialRating={0}
                    emptySymbol={<StarIcon className="h-5 w-5 text-gray-300" />}
                    fullSymbol={
                      <StarIcon className="h-6 w-6 text-yellow-400" />
                    }
                  />
                  {/* <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                      (0 نظر)
                    </span> */}
                </div>

                <div className="flex w-full card-tools text-sm text-gray-700">
                  <div className="flex ml-5">
                    <CircleFlag
                      countryCode={page?.country?.code}
                      className="w-4 ml-2"
                      title={page?.country?.name}
                    />
                    <p className=" truncate">{page?.city?.name}</p>
                  </div>
                  <div className="flex justify-center content-center">
                    <FolderIcon className="w-4 ml-1 text-gray-400" />
                    <span>{page?.category?.name}</span>
                  </div>
                </div>
              </CardBody>
            </div>
            {/* <div>
              <BadgeNew variant={"new"} />
              <BadgeNew variant={"featured"} />
            </div> */}
          </Card>
        );
      })}
      {/* {
        !pageLock ? <div className="w-full mt-9 flex justify-center items-center">
          <span className="loading bg-gray-300 loading-ball loading-lg"></span>
          <span className="loading bg-gray-300 loading-ball loading-xs"></span>
          <span className="loading bg-gray-300 loading-ball loading-sm"></span>
          <span className="loading bg-gray-300 loading-ball loading-md"></span>
        </div>
          : null

      } */}
    </div>
  );
};
