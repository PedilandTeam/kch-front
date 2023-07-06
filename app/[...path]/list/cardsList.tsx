"use client"
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

type CardsListType = {
  paths: usePathSeparatorType,
  unit: UnitType,
  country: CountryNamespace.GET,
}

type ParsedSearchParamsType = {
  city?: string[] | string
  category?: string[] | string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const CardsList = ({ paths, unit, country }: CardsListType) => {
  
  const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({})
  const searchParams = useSearchParams()


  useEffect(() => {
    setPage(1)
    setPages([])
    setParsedSearchParams(queryString.parse(searchParams.toString(), { arrayFormat: 'comma' }))
    perviousPage.current = 0
    setPageLock(false)
  }, [searchParams])


  const [page, setPage] = useState(1)
  const [pageLock, setPageLock] = useState(false)
  const perviousPage = useRef<number>(0)
  const [pages, setPages] = useState<PageNamespace.GET[] | []>([])
  
  
  const [ref,{entry}] = useIntersectionObserver()
  const isVisible = entry && entry.isIntersecting;
  
  
  useEffect(() => {
    if(!isVisible) return;
    if(pageLock)return;
    if(page == perviousPage.current) return;
    perviousPage.current = page;
    setPage(old => old+1)
  },[isVisible])

  const {data, isLoading, error, mutate} = usePages(page, 30, country.code, unit.id, parsedSearchParams.city, parsedSearchParams.category)
  useEffect(() => {
    if(!data?.items)return;
    if(error)return;
    if(data.meta.itemCount <= 0){
      setPageLock(true)
      return
    }else{
      setPageLock(false)
    }
    setPages((old) => [...old, ...data.items])
  },[data])

  if(isLoading && pages.length == 0 || !parsedSearchParams){
    return <p>loading</p>
  }
  
  if(data?.meta?.itemCount <= 0 && pages.length == 0){
    return <p>با فیلتر اعمال شده نتیجه ای یافت نشد</p>
  }
  

  return (
    <>
      {
        pages.map((page: PageNamespace.GET, index: number) => { 


          return (
            <Card ref={index == pages.length-1 ? ref : null} key={page.slug+index} overflow="hidden" variant={"outline"} className="border-gray-200">
              <div className="flex">
                <Link href={`/${page.slug}`}>
                  <Image
                    alt="لیست"
                    src={"/img/list/list-demo.webp"}
                    width={110}
                    height={110}
                    className="rounded-full m-3 ml-0 w-[110px] h-[110px]"
                  />
                </Link>
                <CardBody padding={3}>
                  <div className="flex card-header items-center">
                    <OpenHours />
                    <Link href={`/${page.slug}`} className="mr-2">
                      <h2 className="text-[20px] font-semibold">{page.title}</h2>
                    </Link>
                  </div>

                  <div className="flex mt-3 mb-2 card-rating">
                    {/* @ts-ignore */}
                    <Rating
                      readonly
                      initialRating={0}
                      emptySymbol={<StarIcon className="h-6 w-6 text-gray-300" />}
                      fullSymbol={<StarIcon className="h-6 w-6 text-yellow-400" />}
                    />
                    <span className="flex flex-wrap content-center mr-2 text-sm text-gray-500">
                      (0 نظر)
                    </span>
                  </div>

                  <div className="flex w-full card-tools text-sm text-gray-700">
                    <div className="flex ml-5">
                      <CircleFlag
                        countryCode={page?.country?.code}
                        className="w-4 ml-1"
                        title={page?.country?.name}
                      />
                      <p className=" truncate">{page?.city?.name}</p> 
                    </div>
                    <div className="flex justify-center content-center">
                      <BookOpenIcon className="w-4 ml-1 text-gray-400" />
                      <span>{page?.category?.name}</span>
                    </div>
                  </div>
                </CardBody>
              </div>
              {/* <div>
            <BadgeNew variant={"new"} />
            <BadgeNew variant={"featured"} />
          </div> */}
            </Card>)
        })
      }
    </>
  );
};
