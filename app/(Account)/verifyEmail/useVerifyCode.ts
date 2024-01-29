import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useVerifyCode() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const verifyCode = async (code?: number) => {
        setLoading(true);
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/verifyCode`,
                {
                    code,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                toast.success(res.data?.message);
                router.push('/account');
            })
            .catch((e) => {
                console.error('error', e);
                toast.error(e.response?.data?.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        loading,
        verifyCode,
    };
}
