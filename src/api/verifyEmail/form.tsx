"use client";

import React, { useState } from "react";
import useSendEmailVerificationCode from "./useSendEmailVerificationCode";
import useVerifyCode from "./useVerifyCode";
import { Button, Input } from "@components/index";

type VerifyEmailForm = {
  email: string;
};
export default function VerifyEmailForm({ email }: VerifyEmailForm) {
  const [code, setCode] = useState<number>();
  const { loading, sendEmailVerificationCode } = useSendEmailVerificationCode();
  const { loading: verifyCodeLoading, verifyCode } = useVerifyCode();

  const codeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(+event.target.value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-24 flex h-full items-center justify-center px-3 lg:mt-0 lg:h-[80vh]"
    >
      <div className="mx-auto w-full sm:w-2/4 md:w-2/4 lg:w-4/12">
        <h1 className="font-semibold">تایید ایمیل</h1>
        <p className="mb-3">
          لطفا کد تایید ارسالی به ایمیل {email} را وارد کنید
        </p>
        <div className="grid gap-3">
          <Input
            onChange={codeChangeHandler}
            placeholder="کد تایید"
            type="number"
          />
        </div>
        <div className="mt-3">
          <p
            onClick={() => sendEmailVerificationCode()}
            className="cursor-pointer text-[15px] text-blue-700"
          >
            {loading ? "درحال ارسال ..." : "ارسال دوباره"}
          </p>
          <Button
            onClick={() => verifyCode(code)}
            type="submit"
            className="btn-primary my-6 w-full"
          >
            ارسال
          </Button>
        </div>
      </div>
    </form>
  );
}
