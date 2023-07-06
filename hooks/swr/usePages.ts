"use client"
import useSWR, { KeyedMutator } from 'swr'
import axios, {AxiosRequestConfig} from "axios"
import { useEffect, useState } from 'react'
import { PageNamespace } from '@/types/page'

type queryType = {
  [key: string]: string
} 
const API_URL = process.env.NEXT_PUBLIC_API_URL
export function usePages(page: number = 1, limit: number = 15, countryCode: string, unitId: number, cityIds?: string[] | string, categoryIds?: string | string[]) {

  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    setRendered(true)
  },[page, limit, countryCode, unitId, cityIds, categoryIds])

  const fetcher = async (url: string) => {
    const requestConfig: AxiosRequestConfig = {
      method: "GET",
      url,
    }
    return axios(requestConfig).then(response => response.data).catch(error => error)
  }
  // args:{page, limit, countryCode, unitId, ...cityIds && {cityIds}, ...categoryIds && {categoryIds}}}
  const { data, error, isLoading, mutate } = useSWR(rendered &&`${API_URL}/pages?page=${page}&limit=${limit}&countryCode=${countryCode}&unitId=${unitId}${cityIds ? `&cityIds=${cityIds}` : ""}${categoryIds ? `&categoryIds=${categoryIds}` : ""}`, fetcher)

  return {
    data,
    isLoading,
    error,
    mutate
  } as unknown as {
    data: {
      items: PageNamespace.GET[],
      meta: any
    },
    isLoading: boolean,
    error: boolean,
    mutate: KeyedMutator<any>
  }
}