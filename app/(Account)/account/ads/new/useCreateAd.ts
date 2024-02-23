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
    const createAd = async (data: any) => {
        setLoading(true);
        await axios
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
                toast.success(res.data?.message);
            })
            .catch((err) => {
                toast.error(
                    err.response.data?.message ||
                        'خطایی در هنگام ثبت‌نام پیش آمد'
                );
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