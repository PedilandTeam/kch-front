'use client';
import { _TXT } from '@/app/text';
import { PageNamespace } from '@/types/page';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React, { useCallback, useEffect, useState, useTransition } from 'react';

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
            queryString.parse(searchParams.toString(), { arrayFormat: 'comma' })
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
                    pagesArrayCache.length <
                        paginationLimit - staticPaginations &&
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
                        (paginationLimit -
                            staticPaginations -
                            pagesArrayCache.length);
                    i--
                ) {
                    prevPagesArrayCache.push(i);
                }

                setPagesArray([
                    ...prevPagesArrayCache.reverse(),
                    ...pagesArrayCache,
                ]);
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
        const pageInSearchParams = searchParams.get('page');
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
                { arrayFormat: 'comma' }
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
                ? { rel: 'next' }
                : num < pageNumber
                  ? { rel: 'prev' }
                  : num == pageNumber
                    ? {}
                    : {};
        },
        [pageNumber]
    );

    return (
        <div className='mt-9 flex items-center justify-center'>
            <Link
                rel='next'
                href={`${pathname}?page=${pageNumber + 1}`}
                onClick={buttonLinkHandler}
            >
                <button
                    onClick={nextButtonClickHandler}
                    className={`btn join-item ml-2 ${
                        pageNumber == totalPages && 'btn-active'
                    } `}
                >
                    {_TXT.GENERAL.NEXT}
                </button>
            </Link>
            <div className='join' dir='ltr'>
                <Link
                    {...isPrevOrNext(1)}
                    href={`${pathname}?page=1`}
                    onClick={buttonLinkHandler}
                >
                    <button
                        onClick={paginationButtonClickHandler}
                        className={`btn join-item ${pageNumber == 1 && 'btn-active'} `}
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
                                className={`btn join-item ${
                                    pageNumber == number && 'btn-active'
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
                            className={`btn join-item ${
                                pageNumber == totalPages && 'btn-active'
                            }`}
                        >
                            {totalPages}
                        </button>
                    </Link>
                ) : null}
            </div>
            <Link
                rel='prev'
                href={`${pathname}?page=${pageNumber - 1}`}
                onClick={buttonLinkHandler}
            >
                <button
                    onClick={prevButtonClickHandler}
                    className={`btn join-item mr-2 ${pageNumber == 1 && 'btn-disabled'} `}
                >
                    {_TXT.GENERAL.PREVIOUS}
                </button>
            </Link>
        </div>
    );
}
