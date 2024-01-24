import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import signOutAction from "@/actions/signOut.action";



export default function useChangePassword() {


    const [loading, setLoading] = useState<boolean>(false)
    const changePassword = (token: string, email: string, newPassword: string) => {
        setLoading(true)
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/resetPassword`, undefined, {
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
            toast.error('خطایی پیش آمد')
            console.log(e);        
        })
        .finally(() => {
            setLoading(false)
        })
    }

    return {
        changePassword,
        loading
    }

}