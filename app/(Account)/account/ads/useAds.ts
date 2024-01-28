import useSWR from "swr";


export default function useAds() {

    const { data: ads, isLoading: isAdsLoading, error: adsError } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/ads`)
    return {
        ads,
        isAdsLoading,
        adsError
    }

}