'use client'
import { PageNamespace } from "@/types/page";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";



type PaginationProps = {
    pages: PageNamespace.GET
}
export default function ({ pages }: PaginationProps) {



    let totalPages = pages.meta.totalPages
    const paginationLimit = 9
    const staticPaginations = 2
    const [isPagesLengthBiggerThanSix, setisPagesLengthBiggerThanSix] = useState(false)
    const [pagesArray, setPagesArray] = useState<number[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()



    /** 
     * if totalPages are equal or lower than standard(usually 6) then all pages appear in pagination
     * else just render pagination equal to standard (usually 6) to limit pagination buttons
     */
    useEffect(() => {
        updatePagination()
    }, [totalPages, paginationLimit, pageNumber])


    const updatePagination = () => {
        startTransition(() => {
            if (totalPages >= paginationLimit) {
                const pagesArrayCache = []
                let i = pageNumber
                while (pagesArrayCache.length < (paginationLimit - staticPaginations) && i < totalPages) {
                    if (i > 1)
                        pagesArrayCache.push(i)
                    i++
                }

                const prevPagesArrayCache = []
                for (let i = pageNumber - 1; i > pageNumber - ((paginationLimit - staticPaginations) - pagesArrayCache.length); i--) {
                    prevPagesArrayCache.push(i)
                }

                setPagesArray([...prevPagesArrayCache.reverse(), ...pagesArrayCache])
            } else {
                if(totalPages > 2){
                    const temp = []
                    for(let i=2; i <= totalPages; i++){
                        temp.push(i)
                    }
                    setPagesArray([...temp])
                }else{
                    setPagesArray([])
                }
                // setPagesArray(Array.from({ length: totalPages }))
            }
        })
    }

    useEffect(() => {
        const pageInSearchParams = searchParams.get("page");
        if (!pageInSearchParams) return;
        setPageNumber(+pageInSearchParams)
    }, [searchParams])


    const paginationButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // updatePagination()
        router.replace(`${pathname}?page=${e.currentTarget.textContent}`, {scroll: true})
    }

    const nextButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // const buttonNumber = +e.currentTarget.textContent!
        if (pageNumber < totalPages) {
            // updatePagination()
            router.replace(`${pathname}?page=${pageNumber + 1}`, { scroll: true })
        }
    }

    const prevButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // const buttonNumber = +e.currentTarget.textContent!
        if (pageNumber > 1) {

            router.replace(`${pathname}?page=${pageNumber - 1}`, { scroll: true })
        }
    }

    const buttonLinkHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
    }


    return (
        <div className="flex justify-center items-center mt-9">

            <Link href={`${pathname}?page=${pageNumber + 1}`} onClick={buttonLinkHandler}>
                <button onClick={nextButtonClickHandler} className={`join-item btn ml-2 ${pageNumber == totalPages && "btn-active"} `}>بعدی</button>

            </Link>
            <div className="join" dir="ltr">

                <Link href={`${pathname}?page=1`} onClick={buttonLinkHandler}>
                    <button onClick={paginationButtonClickHandler} className={`join-item btn ${pageNumber == 1 && "btn-active"} `}>{1}</button>
                </Link>

                {
                    pagesArray?.map((number, index) => {
                        return (
                            <Link key={`pagination-button-${number}`} href={`${pathname}?page=${number}`} onClick={buttonLinkHandler}>
                                <button onClick={paginationButtonClickHandler} className={`join-item btn ${pageNumber == number && "btn-active"} `}>{number}</button>
                            </Link>
                        )
                    })
                }
                {
                    totalPages >= paginationLimit ? (
                        <Link href={`${pathname}?page=${totalPages}`} onClick={buttonLinkHandler}>
                            <button onClick={paginationButtonClickHandler} className={`join-item btn ${pageNumber == totalPages && "btn-active"}`}>{totalPages}</button>
                        </Link>
                    )
                        :
                        null
                }
            </div>
            <Link href={`${pathname}?page=${pageNumber - 1}`} onClick={buttonLinkHandler}>
                <button onClick={prevButtonClickHandler} className={`join-item btn mr-2 ${pageNumber == 1 && "btn-disabled"} `}>قبلی</button>
            </Link>

        </div>
    )

}