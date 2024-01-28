'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useParamsChecker } from "./components/useParamsChecker"
import { useUser } from "@/store/useUser"
import Overview from "./components/overview"


export default function Account() {

    // Check params for messages
    useParamsChecker()
    const { user } = useUser()

    if(user) 
    return (
        <div className="w-full">
            {
                user?.ads?.length > 0 ?
                    <Overview/>
                :
                    <div>dont have ads</div>
            }
        </div>
    )
}