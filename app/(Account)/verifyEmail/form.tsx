'use client'

import React, { useState } from "react";
import useSendEmailVerificationCode from "./useSendEmailVerificationCode";
import useVerifyCode from "./useVerifyCode";
import Input from "@/components/daisy/input";
import Button from "@/components/daisy/button";


type VerifyEmailForm = {
  email: string
}
export default function VerifyEmailForm({email}: VerifyEmailForm) {

  const [code, setCode] = useState<number>()
  const {loading, sendEmailVerificationCode} = useSendEmailVerificationCode()
  const {loading: verifyCodeLoading, verifyCode} = useVerifyCode()

  const codeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(+event.target.value)
  }

  return (
    <form onSubmit={e => e.preventDefault()} className="lg:h-[80vh] mt-24 lg:mt-0 px-3 h-full flex items-center justify-center ">
      <div className="w-full sm:w-2/4 md:w-2/4 lg:w-4/12 mx-auto">
        <h1 className="font-semibold">تایید ایمیل</h1>
        <p className="mb-3">لطفا کد تایید ارسالی به ایمیل {email} را وارد کنید</p>
        <div className="grid gap-3">
          <Input onChange={codeChangeHandler} bordered placeholder="کد تایید" type="number" />
        </div>
        <div className="mt-3">
          <p onClick={() => sendEmailVerificationCode()} className="text-[15px] cursor-pointer text-blue-700">
            {loading ? 'درحال ارسال ...' : 'ارسال دوباره'}
          </p>
          <Button onClick={() => verifyCode(code)} type="submit" className="my-6 w-full btn-primary" isLoading={verifyCodeLoading}>
            ارسال
          </Button>
        </div>
      </div>
    </form>
  )


}