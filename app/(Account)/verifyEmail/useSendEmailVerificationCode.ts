import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useSendEmailVerificationCode() {
    const [loading, setLoading] = useState<boolean>(false);

    const sendEmailVerificationCode = async () => {
        setLoading(true);
        return await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/verifyEmail`,
            {
                method: 'POST',
                credentials: 'include',
            }
        )
            .then(async (res) => {
                const response = await res.json();
                if (!res.ok) {
                    return toast.error(response.message);
                }
                toast.success(response.message);
            })
            .catch((e) => {
                toast.error('خطایی در اتصال پیش آمد');
            })
            .finally(() => setLoading(false));
    };

    return { loading, sendEmailVerificationCode };
}
