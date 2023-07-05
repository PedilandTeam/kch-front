"use client"
import useSWR, { KeyedMutator } from 'swr'
import axios, {AxiosRequestConfig} from "axios"
import { useEffect } from 'react'
import { PageNamespace } from '@/types/page'

type queryType = {
  [key: string]: string
} 
const API_URL = process.env.NEXT_PUBLIC_API_URL
export function usePages(page: number = 1, limit: number = 15, countryCode: string, unitId: number, cityIds?: string[] | string, categoryIds?: string | string[]) {

  const fetcher = async ({url, args}: {url:string, args: any}) => {
    const requestConfig: AxiosRequestConfig = {
      method: "GET",
      url,
      params: args
    }
    return axios(requestConfig).then(response => response.data).catch(error => error)
  }
  const { data, error, isLoading, mutate } = useSWR({url: `${API_URL}/pages`, args:{page, limit, countryCode, unitId, ...cityIds && {cityIds}, ...categoryIds && {categoryIds}}}, fetcher)

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