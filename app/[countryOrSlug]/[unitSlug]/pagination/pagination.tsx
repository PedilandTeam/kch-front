'use client'
import { PageNamespace } from "@/types/page";
import { notFound, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";






type PaginationProps = {
    pages: PageNamespace.GET
}
export default function ({ pages }: PaginationProps) {



    let totalPages = 20
    const paginationLimit = 9
    const staticPaginations = 2
    const [isPagesLengthBiggerThanSix, setisPagesLengthBiggerThanSix] = useState(false)
    const [pagesArray, setPagesArray] = useState<number[]>([])
    const [pageNumber, setPageNumber] = useState<number>(1)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    /** 
     * if totalPages are equal or lower than standard(usually 6) then all pages appear in pagination
     * else just render pagination equal to standard (usually 6) to limit pagination buttons
     */
    useEffect(() => {
        if (totalPages >= paginationLimit) {
            const pagesArrayCache = []
            let i = pageNumber
            while (pagesArrayCache.length < (paginationLimit - staticPaginations) && i < totalPages) {
                if(i > 1)
                    pagesArrayCache.push(i)
                i++
            }
            
            const prevPagesArrayCache = []
            for(let i=pageNumber-1; i > pageNumber - ((paginationLimit - staticPaginations) -  pagesArrayCache.length); i--){
               prevPagesArrayCache.push(i)
            }

            setPagesArray([...prevPagesArrayCache.reverse(), ...pagesArrayCache])
        } else {
            setPagesArray([2, 3])
        }
    }, [totalPages, paginationLimit, pageNumber])

    useEffect(() => {
        const pageInSearchParams = searchParams.get("page");
        if (!pageInSearchParams) return;
        setPageNumber(+pageInSearchParams)
    }, [searchParams])


    const paginationButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        router.replace(`${pathname}?page=${e.currentTarget.textContent}`,)
    }

    const nextButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // const buttonNumber = +e.currentTarget.textContent!
        if (pageNumber < totalPages) {
            router.replace(`${pathname}?page=${pageNumber + 1}`)
        }
    }

    const prevButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        // const buttonNumber = +e.currentTarget.textContent!
        if (pageNumber > 1) {
            router.replace(`${pathname}?page=${pageNumber - 1}`)
        }
    }


    return (
        <div className="flex justify-center items-center mt-9">
            <button onClick={nextButtonClickHandler} className={`join-item btn ml-2 ${pageNumber == totalPages && "btn-active"} `}>بعدی</button>
            <div className="join" dir="ltr">

                <button onClick={paginationButtonClickHandler} className={`join-item btn ${pageNumber == 1 && "btn-active"} `}>{1}</button>

                {
                    pagesArray?.map((number, index) => {
                        return <button onClick={paginationButtonClickHandler} key={`pagination-button-${number}`} className={`join-item btn ${pageNumber == number && "btn-active"} `}>{number}</button>
                    })
                }
                {
                    totalPages >= paginationLimit ? (
                        <button onClick={paginationButtonClickHandler} className={`join-item btn ${pageNumber == totalPages && "btn-active"}`}>{totalPages}</button>
                    )
                        :
                        null
                }
            </div>
            <button onClick={prevButtonClickHandler} className={`join-item btn mr-2 ${pageNumber == 1 && "btn-disabled"} `}>قبلی</button>

        </div>
    )

}