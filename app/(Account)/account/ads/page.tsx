'use client'

import { fetcher } from "@/app/swr/fetcher"
import { AdNamespace } from "@/types/ad"
import useSWR from "swr"
import Ad from "./components/ad"

export default function Ads() {
  const { data: ads, isLoading: isAdsLoading, error: adsError } = useSWR<AdNamespace.GET>(`${process.env.NEXT_PUBLIC_API_URL}/ads?limit=100&page=1`, fetcher)


  if (isAdsLoading) {
    return (
      <div className="skeleton w-32 h-32"></div>
    )
  }

  return(
      <div className="flex flex-col gap-y-2 justify-center items-center">
          {
              ads?.items?.map(ad => {
                  return (
                    <Ad key={ad.id} data={ad}/>
                  )
              })
          }

      </div>
  )
}
