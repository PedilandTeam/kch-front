import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import signOutAction from "@/actions/signOut.action";



export default function useChangePassword() {


    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()
    const changePassword = (token: string, email: string, newPassword: string) => {
        setLoading(true)
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/resetPassword?type=user`, undefined, {
            withCredentials: true,
            params: {
                token,
                email,
                password: newPassword
            }
        })
        .then(res => {
            toast.success(`${res.data.message}\n با رمز جدید وارد شوید`, )
            signOutAction()
        })
        .catch(e => {
            setError(e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return {
        changePassword,
        loading,
        error
    }

}