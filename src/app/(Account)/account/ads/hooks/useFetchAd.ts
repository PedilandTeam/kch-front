import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useFetchAd() {
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Asynchronously creates an ad using the provided data.
     *
     * @param {any} data - the data to be used for creating the ad
     * @return {Promise<any>} a Promise that resolves with the ID of the created ad
     */
    const fetchAd = async (adId: string): Promise<any> => {
        setLoading(true);
        return await axios
            .get(
                `${process.env.NEXT_PUBLIC_API_URL}/ads/${adId}`,
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                toast.error(
                    err.response.data?.message ||
                        'خطایی در هنگام ثبت‌نام پیش آمد'
                );

                throw Error('خطایی در هنگام ثبت‌نام پیش آمد')
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return {
        fetchAdLoading: loading,
        fetchAd,
    };
}