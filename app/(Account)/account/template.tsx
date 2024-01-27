'use client'

import React, { useEffect, useState } from "react";
import SideMenu from "@app/layout/sideMenu";
import { usePathname } from "next/navigation";
import { SideMenuList } from "@app/layout/sideMenuList";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
// import SideMenu from "../layout/side-menu";


export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname()
  const router = useRouter()
  const [firstCheckPassed, setFirstCheckPassed] = useState<boolean>(false)

  const { isLoading, user, isNotVerified, isAuthenticated, error } = useAuthCheck()

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined' || isLoading) return
    if (!isAuthenticated) {
      toast.error('لطفا وارد شوید')
      router.push('/login')
    } else {
      setFirstCheckPassed(true)
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    if (typeof isNotVerified == 'undefined' || isLoading) return
    if (isNotVerified) {
      toast.error('باید اول ایمیل خودرا تایید کنید')
      router.push('verifyEmail')
    }
  }, [isNotVerified, isLoading, router])

  return (
    <div className={`grid grid-cols-5 gap-5`}>
      <div className="col-span-4">
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <SideMenu SideMenuList={SideMenuList} />
            {/* <SideMenu /> */}
          </div>
          <div className={`${firstCheckPassed && (isLoading || !isAuthenticated) ? 'blur-md' : ''}  col-span-3`}>
            {children}
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
    </div>
  )

}