import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function useRegisterUser() {
    const [loading, setLoading] = useState<boolean>(false)
    const registerUser = async (data: any, captchaToken: string) => {
        setLoading(true)
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup`, {
            ...data,
            token: captchaToken
        }, {
            withCredentials: true
        })
            .then(res => {
                toast.success(res.data?.message)

            })
            .catch(err => {
                toast.error(err.response.data?.message || 'خطایی در هنگام ثبت‌نام پیش آمد')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return {
        registerUserLoading: loading,
        registerUser
    }
}