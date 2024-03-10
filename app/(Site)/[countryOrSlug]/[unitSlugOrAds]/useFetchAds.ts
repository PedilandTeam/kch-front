import useSWR from "swr";


type fetchAds = {
    page: number | string;
}
const useFetchAds = () => {

    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/ads`);
    const { data: ads, error: adsError, isLoading: adsLoading } = useSWR(baseUrl.toString(), fetcher)
    const fetchAds = ({ page }:fetchAds) => {

        const baseUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL}/ads`)
        baseUrl.searchParams.append('page', String(page));

    }

}