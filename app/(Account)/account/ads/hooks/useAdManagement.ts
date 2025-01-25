import { AdNamespace } from "@/types/ad";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAdManagement() {
    const [createAdLoading, setCreateAdLoading] = useState<boolean>(false);
    const [updateAdLoading, setUpdateAdLoading] = useState<boolean>(false)

    const createAd = async (data?: any, adId?: string): Promise<any> => {
        !adId &&setCreateAdLoading(true);

        const config: AxiosRequestConfig = {
            url: `${process.env.NEXT_PUBLIC_API_URL}/ads${adId ? `/${adId}` : ''}`,
            method: adId ? 'PATCH' : 'POST',
            data,
            withCredentials: true
        }

        return await axios(config)
            .then((res) => {
                return res.data?.id
            })
            .catch((err) => {
                toast.error(
                    err.response.data?.message ||
                        'An error occurred while creating the ad'
                );
                throw Error('An error occurred while creating the ad')
            })
            .finally(() => {
                !adId &&setCreateAdLoading(false);
            });
    };

    const updateAd = async (adId: string, data: any) => {
        console.log(adId);
        
        setUpdateAdLoading(true);
        return await createAd(data, adId).finally(() => setUpdateAdLoading(false))
    }
    return {
        createAdLoading,
        updateAdLoading,
        createAd,
        updateAd
    };
}