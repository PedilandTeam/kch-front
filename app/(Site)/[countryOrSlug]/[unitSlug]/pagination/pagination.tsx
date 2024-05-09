"use client";

import { PageNamespace } from "@/types/page";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
} from "app/client-packages/phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback, useEffect, useState, useTransition } from "react";

type ParsedSearchParams = {
  page?: number;
  city?: number | number[];
  category?: number | number[];
};
type PaginationProps = {
  pages: PageNamespace.GET;
};
export default function Pagination({ pages }: PaginationProps) {
  let totalPages = pages.meta.totalPages;
  const paginationLimit = 9;
  const staticPaginations = 2;
  const [isPagesLengthBiggerThanSix, setisPagesLengthBiggerThanSix] =
    useState(false);
  const [pagesArray, setPagesArray] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParams>();

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" })
    );
  }, [searchParams]);

  /**
   * if totalPages are equal or lower than standard(usually 6) then all pages appear in pagination
   * else just render pagination equal to standard (usually 6) to limit pagination buttons
   */
  useEffect(() => {
    updatePagination();
  }, [totalPages, paginationLimit, pageNumber]);

  const updatePagination = () => {
    startTransition(() => {
      if (totalPages >= paginationLimit) {
        const pagesArrayCache = [];
        let i = pageNumber;
        while (
          pagesArrayCache.length < paginationLimit - staticPaginations &&
          i < totalPages
        ) {
          if (i > 1) pagesArrayCache.push(i);
          i++;
        }

        const prevPagesArrayCache = [];
        for (
          let i = pageNumber - 1;
          i >
          pageNumber -
            (paginationLimit - staticPaginations - pagesArrayCache.length);
          i--
        ) {
          prevPagesArrayCache.push(i);
        }

        setPagesArray([...prevPagesArrayCache.reverse(), ...pagesArrayCache]);
      } else {
        if (totalPages > 1) {
          const temp = [];
          for (let i = 2; i <= totalPages; i++) {
            temp.push(i);
          }
          setPagesArray([...temp]);
        } else {
          setPagesArray([]);
        }
        // setPagesArray(Array.from({ length: totalPages }))
      }
    });
  };

  useEffect(() => {
    const pageInSearchParams = searchParams.get("page");
    if (!pageInSearchParams) return;
    setPageNumber(+pageInSearchParams);
  }, [searchParams]);

  const routeGenerator = (
    page: number | string,
    parsedSearchParams: ParsedSearchParams | undefined
  ) => {
    delete parsedSearchParams?.page;
    router.replace(
      `${pathname}?page=${page}&${queryString.stringify(
        parsedSearchParams || {},
        { arrayFormat: "comma" }
      )}`,
      { scroll: true }
    );
  };

  const paginationButtonClickHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    routeGenerator(e.currentTarget?.textContent ?? 1, parsedSearchParams);
  };

  const nextButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pageNumber < totalPages) {
      routeGenerator(pageNumber + 1, parsedSearchParams);
    }
  };

  const prevButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pageNumber > 1) {
      routeGenerator(pageNumber - 1, parsedSearchParams);
    }
  };

  const buttonLinkHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  const isPrevOrNext = useCallback(
    (num: number) => {
      return num > pageNumber
        ? { rel: "next" }
        : num < pageNumber
        ? { rel: "prev" }
        : num == pageNumber
        ? {}
        : {};
    },
    [pageNumber]
  );

  return (
    <div className="flex items-center justify-center my-10 sm:mb-20">
      <Link
        rel="next"
        href={
          pageNumber == totalPages ? "#" : `${pathname}?page=${pageNumber + 1}`
        }
        className={pageNumber == totalPages ? "cursor-default" : ""}
        onClick={buttonLinkHandler}
      >
        <button
          onClick={nextButtonClickHandler}
          className={`_join-item btn border-none bg-white shadow-none pr-0 pl-2 sm:pl-4 ${
            pageNumber == totalPages
              ? "btn-disabled text-gray-300"
              : "btn-active text-sky-600 hover:text-black"
          }`}
        >
          <ArrowCircleRight size={32} weight="light" />
        </button>
      </Link>

      <div className="join" dir="ltr">
        <Link
          {...isPrevOrNext(1)}
          href={`${pathname}?page=1`}
          onClick={buttonLinkHandler}
        >
          <button
            onClick={paginationButtonClickHandler}
            className={`join-item font-bold border-sky-500 border-dashed text-sky-700 btn ${
              pageNumber == 1
                ? "bg-sky-100 btn-active"
                : "bg-sky-50 hover:bg-sky-100"
            } `}
          >
            {1}
          </button>
        </Link>

        {pagesArray?.map((number, index) => {
          return (
            <Link
              {...isPrevOrNext(number)}
              key={`pagination-button-${number}`}
              href={`${pathname}?page=${number}`}
              onClick={buttonLinkHandler}
            >
              <button
                onClick={paginationButtonClickHandler}
                className={`join-item btn border-dashed border-sky-500 text-sky-700 shadow-none ${
                  pageNumber == number
                    ? "btn-active bg-sky-100"
                    : "hover:bg-sky-100 bg-sky-50"
                } `}
              >
                {number}
              </button>
            </Link>
          );
        })}
        {totalPages >= paginationLimit ? (
          <Link
            {...isPrevOrNext(totalPages)}
            href={`${pathname}?page=${totalPages}`}
            onClick={buttonLinkHandler}
          >
            <button
              onClick={paginationButtonClickHandler}
              className={`join-item btn ${
                pageNumber == totalPages && "btn-active"
              }`}
            >
              {totalPages}
            </button>
          </Link>
        ) : null}
      </div>

      <Link
        rel="prev"
        href={pageNumber == 1 ? "#" : `${pathname}?page=${pageNumber - 1}`}
        className={pageNumber == 1 ? "cursor-default" : ""}
        onClick={buttonLinkHandler}
      >
        <button
          onClick={prevButtonClickHandler}
          className={`_join-item btn border-none bg-white shadow-none pr-2 sm:pr-4 pl-0 ${
            pageNumber == 1
              ? "btn-disabled text-gray-300"
              : "text-sky-600 hover:text-black"
          }`}
        >
          <ArrowCircleLeft size={32} weight="light" />
        </button>
      </Link>
    </div>
  );
}
