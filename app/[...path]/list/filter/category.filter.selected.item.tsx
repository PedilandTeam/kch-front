
"use client"

import { CategoryNamespace } from "@/types/category"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import React, { useCallback, useEffect, useRef, useState, useTransition } from "react"



type CategoryFilterSelectedItemProps = {
    category: CategoryNamespace.category
}

type ParsedSearchParamsType = {
    category?: string[] | string
}

export default function CategoryFilterSelectedItem({ category }: CategoryFilterSelectedItemProps) {

    const router = useRouter()
    const searchParams = useSearchParams() as unknown as URLSearchParams
    const pathname = usePathname()
    const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({})
    const [isPending, startTransition] = useTransition()
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setParsedSearchParams(queryString.parse(searchParams.toString(), { arrayFormat: 'comma' }))
    }, [searchParams])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = queryString.parse(searchParams.toString())
            let targetValues = params?.[name]
            const newValue = [value]
            if (!targetValues) {
                params[name] = value
                return queryString.stringify(params)
            }
            if (!Array.isArray(targetValues)) {
                newValue.push(targetValues)
            } else {
                //@ts-expect-error
                newValue.push(...targetValues)
            }
            params[name] = newValue
            return queryString.stringify(params, { arrayFormat: "comma" })
        },
        [searchParams]
    )

    const deleteQueryString = useCallback(
        (name: string, value: string) => {
            const params = queryString.parse(searchParams.toString(), { arrayFormat: 'comma' })
            let targetValues = params?.[name]

            if (!targetValues) {
                return
            }
            if (!Array.isArray(targetValues)) {
                delete params[name]
            } else {
                const indexofTarget = targetValues.findIndex(param => param == value)
                if (indexofTarget == -1) return
                targetValues.splice(indexofTarget, 1)
            }
            return queryString.stringify(params, { arrayFormat: "comma" })
        },
        [searchParams]
    )
    const inputClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
        const currentTarget = event.currentTarget
        if (!currentTarget.checked) {
            return router.replace(`${pathname}?${deleteQueryString("category", currentTarget.value)}`)
        }
        router.replace(`${pathname}?${createQueryString("category", currentTarget.value)}`)
    }


    return (
        <label key={category.name} htmlFor={`category-select-${category.name}`} className="item flex items-center justify-between py-4 ">
            <label htmlFor={`category-select-${category.name}`} className="text-md">{category.name}</label>
            {/**  @ts-expect-error */}
            <input ref={ref} className="checkbox checkbox-primary checkbox-sm" onChange={inputClickHandler} id={`category-select-${category.name}`} value={category.id} type="checkbox" checked={Array.isArray(parsedSearchParams.category) ? !!parsedSearchParams.category.find(param => param == category.id) : parsedSearchParams.category == category.id} />
        </label>
    )

}