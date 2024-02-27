import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useDeleteAd() {
    const [loading, setLoading] = useState<boolean>(false);
    const deleteAd = async (adId: string): Promise<any> => {
        setLoading(true);
        return await axios
            .delete(
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
                        'خطایی در هنگام حذف پیش آمد'
                );

                throw Error('خطایی در هنگام حذف پیش آمد')
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return {
        deleteAdLoading: loading,
        deleteAd,
    };
}