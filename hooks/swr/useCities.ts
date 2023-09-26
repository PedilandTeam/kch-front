"use client"
import useSWR from 'swr'
import axios, {AxiosRequestConfig} from "axios"
import { useEffect } from 'react'
import { PageNamespace } from '@/types/page'
import { CityNamespace } from '@/types/city'

type queryType = {
  [key: string]: string
} 
const API_URL = process.env.NEXT_PUBLIC_API_URL
export function useCities(page: number = 1, limit: number = 15, countryCode: string) {

  const fetcher = async ({url, args}: {url:string, args: any}) => {
    const requestConfig: AxiosRequestConfig = {
      method: "GET",
      url,
      params: args
    }
    return axios(requestConfig).then(response => response.data).catch(error => error)
  }
  const { data, error, isLoading } = useSWR({url: `${API_URL}/cities`, args:{page, limit, countryCode,}}, fetcher)
  

  return {
    data,
    isLoading,
    error,
  } as unknown as {
    data: {
      items: CityNamespace.GET[],
      meta: any
    },
    isLoading: boolean,
    error: boolean
  }
}