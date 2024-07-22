import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useChangePassword() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError>();
    const router = useRouter();
    const changePassword = (
        token: string,
        email: string,
        newPassword: string
    ) => {
        setLoading(true);
        axios
            .patch(
                `${process.env.NEXT_PUBLIC_API_URL}/resetPassword?type=user`,
                undefined,
                {
                    withCredentials: true,
                    params: {
                        token,
                        email,
                        password: newPassword,
                    },
                }
            )
            .then((res) => {
                toast.success(`${res.data.message}\n با رمز جدید وارد شوید`);
                router.push('/login');
            })
            .catch((e) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        changePassword,
        loading,
        error,
    };
}
