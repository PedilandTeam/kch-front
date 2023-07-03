"use client"

import { CityNamespace } from "@/types/city"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import React, { memo, useCallback, useEffect, useState, useTransition } from "react"



type CityFilterItemProps = {
    city: CityNamespace.city
}

type ParsedSearchParamsType = {
    city?: string[] | string
}
function CityFilterItem({ city }: CityFilterItemProps) {

    const router = useRouter()
    const searchParams = useSearchParams() as unknown as URLSearchParams
    const pathname = usePathname()
    const [parsedSearchParams, setParsedSearchParams] = useState<ParsedSearchParamsType>({})
    const [isPending, startTransition] = useTransition()

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
            return router.replace(`${pathname}?${deleteQueryString("city", currentTarget.value)}`)
        }
        router.replace(`${pathname}?${createQueryString("city", currentTarget.value)}`)
    }

    return (
        <div key={city.name} className="item flex justify-between items-center">
            <label htmlFor={`city-select-${city.name}`} className="text-sm">{city.name}</label>
            {/**  @ts-expect-error */}
            <input onChange={inputClickHandler} id={`city-select-${city.name}`} value={city.id} type="checkbox" checked={Array.isArray(parsedSearchParams.city) ? !!parsedSearchParams.city.find(param => param == city.id) : parsedSearchParams.city == city.id} className="checkbox checkbox-sm" />
        </div>
    )

}

export default memo(CityFilterItem)