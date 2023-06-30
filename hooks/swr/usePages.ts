"use client"
import useSWR from 'swr'
import axios, {AxiosRequestConfig} from "axios"
import { useEffect } from 'react'
import { PageNamespace } from '@/types/page'

type queryType = {
  [key: string]: string
} 
const API_URL = process.env.NEXT_PUBLIC_API_URL
export function usePages(page: number = 1, limit: number = 15, countryCode: string, unitId: number) {

  const fetcher = async ({url, args}: {url:string, args: any}) => {
    const requestConfig: AxiosRequestConfig = {
      method: "GET",
      url,
      params: args
    }
    return axios(requestConfig).then(response => response.data).catch(error => error)
  }
  // useEffect(() => {
  //   console.log(`${API_URL}/pages?page=${page}&limit=${limit}?countryCode=${countryCode}`);
    
  // })
  const { data, error, isLoading } = useSWR({url: `${API_URL}/pages`, args:{page, limit, countryCode, unitId}}, fetcher)
  console.log(`${API_URL}?page=${page}&limit=${limit}`);
  

  return {
    data,
    isLoading,
    isError: error
  } as unknown as {
    data: {
      items: PageNamespace.GET[],
      meta: any
    },
    isLoading: boolean,
    isError: boolean
  }
}