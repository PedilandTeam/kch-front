'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useParamsChecker } from "./useParamsChecker"


export default function Account() {

    // Check params for messages
    useParamsChecker()

    return (
        <div>
            account
        </div>
    )
}