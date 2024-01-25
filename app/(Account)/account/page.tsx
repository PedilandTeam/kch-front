'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"


export default function Account() {

    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(() => {
        if (searchParams.has('alreadyVerified')) {
            toast.success('ایمیل شما قبلا تایید شده است')
            router.replace('/account')
        }
    }, [searchParams, router])

    return (
        <div>This is Account section</div>
    )
}