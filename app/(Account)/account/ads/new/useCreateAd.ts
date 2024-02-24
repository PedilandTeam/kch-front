import { AdNamespace } from "@/types/ad";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface useCreateAdProps extends Omit<AdNamespace.IAd, 'country' | 'city' | 'pictures' | 'createdDate' | 'updatedDate' | 'availability'> {
    countryId: string | number;
    cityId: string | number;
    categoryId: string | number;
    pictures: File[];
}
export default function useCreateAd() {
    const [loading, setLoading] = useState<boolean>(false);
    /**
     * Asynchronously creates an ad using the provided data.
     *
     * @param {any} data - the data to be used for creating the ad
     * @return {Promise<any>} a Promise that resolves with the ID of the created ad
     */
    const createAd = async (data: any): Promise<any> => {
        setLoading(true);
        return await axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/ads`,
                {
                    ...data,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                return res.data?.id
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
        createAdLoading: loading,
        createAd,
    };
}