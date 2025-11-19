"use client";

import type { GetPagesResponse } from "@/types/page";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui";
import { e2p } from "@/utils/e2p";

type ParsedSearchParams = {
  page?: number;
  city?: number | number[];
  category?: number | number[];
};

type PaginationProps = {
  pages: GetPagesResponse;
};

export const ListPagination = ({ pages }: PaginationProps) => {
  let totalPages = pages.meta.totalPages;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [parsedSearchParams, setParsedSearchParams] =
    useState<ParsedSearchParams>();

  useEffect(() => {
    setParsedSearchParams(
      queryString.parse(searchParams.toString(), { arrayFormat: "comma" }),
    );
  }, [searchParams]);

  useEffect(() => {
    const pageInSearchParams = searchParams.get("page");
    if (!pageInSearchParams) return;
    setPageNumber(+pageInSearchParams);
  }, [searchParams]);

  const searchParamsString = queryString.stringify(parsedSearchParams || {}, {
    arrayFormat: "comma",
  });

  const routeGenerator = (
    page: number | string,
    parsedSearchParams: ParsedSearchParams | undefined,
  ) => {
    delete parsedSearchParams?.page;
    router.replace(
      `${pathname}?page=${page}${searchParamsString ? `&${searchParamsString}` : ""}`,
      {
        scroll: true,
      },
    );
  };

  const generatePaginationUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePaginationClick = (page: number) => {
    routeGenerator(page, parsedSearchParams);
  };

  return (
    <Pagination className="py-3">
      <PaginationContent>
        {pageNumber > 1 && (
          <PaginationItem>
            <PaginationFirst
              href={generatePaginationUrl(1)}
              onClick={(e) => {
                e.preventDefault();
                handlePaginationClick(1);
              }}
              size="default"
            />
          </PaginationItem>
        )}

        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={pageNumber > 1 ? generatePaginationUrl(pageNumber - 1) : "#"}
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber > 1) {
                handlePaginationClick(pageNumber - 1);
              }
            }}
            className={pageNumber <= 1 ? "pointer-events-none opacity-50" : ""}
            size="default"
          />
        </PaginationItem>

        <PaginationItem>
          <Button
            variant="ghost"
            className="text-primary hover:text-primary size-9 cursor-auto rounded-full bg-blue-50/70 text-base hover:bg-blue-50/70"
          >
            {e2p(pageNumber)}
          </Button>
        </PaginationItem>
        <PaginationItem className="px-2">از</PaginationItem>
        <Button
          variant="ghost"
          className="text-primary hover:text-primary size-9 cursor-auto rounded-full bg-blue-50/70 text-base hover:bg-blue-50/70"
        >
          {e2p(totalPages)}
        </Button>

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              pageNumber < totalPages
                ? generatePaginationUrl(pageNumber + 1)
                : "#"
            }
            onClick={(e) => {
              e.preventDefault();
              if (pageNumber < totalPages) {
                handlePaginationClick(pageNumber + 1);
              }
            }}
            className={
              pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""
            }
            size="default"
          />
        </PaginationItem>

        {/* Last Button - only show if not on last page */}
        {pageNumber < totalPages && (
          <PaginationItem>
            <PaginationLast
              href={generatePaginationUrl(totalPages)}
              onClick={(e) => {
                e.preventDefault();
                handlePaginationClick(totalPages);
              }}
              size="default"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
