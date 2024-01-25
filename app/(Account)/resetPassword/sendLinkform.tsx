"use client";
import React, { useEffect, useState } from "react";
import useSendResetPassword from "./useSendResetPassword";
import EmailSent from "./emailSent";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Input from "@/components/daisy/input";
import Button from "@/components/daisy/button";
import toast from "react-hot-toast";

export default function SendLinkForm() {
  const { loading, sendResetPassword, emailSent, error } = useSendResetPassword();
  const [email, setEmail] = useState<string>();
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Check email validity (you can use your own validation logic)
    const isValidEmail = /\S+@\S+\.\S+/.test(newEmail);
    setIsEmailValid(isValidEmail);
  };

  useEffect(() => {
    if (!error) return;
    const data = error?.response?.data as { message?: string }
    toast.error(data?.message || 'خطایی پیش آمد')
  }, [error])

  if (emailSent) {
    return <EmailSent />;
  }

  return (
    <div className="lg:h-[80vh] mt-24 lg:mt-0 flex flex-wrap items-baseline sm:items-center bg-simple-1 sm:relative">
      {/* <HeaderSimple /> */}

      <div className="w-full sm:w-2/4 md:w-2/4 lg:w-4/12 mx-3 sm:mx-auto bg-white p-6 sm:p-8 rounded-xl shadow border border-t-[4px] border-t-yellow-500 relative">
        <div className="absolute left-10 -top-[52px]">
          <Image
            src={"/images/bird-symbol.png"}
            width={50}
            height={50}
            alt="Koocha Bird Symbol"
          />
        </div>
        <h1 className="font-semibold mb-2 text-lg">تغییر رمز عبور</h1>
        <p className="mb-4 text-gray-500">
          لینک ایجاد رمز عبور جدید به ایمیل شما ارسال خواهد شد.
        </p>
        <form onClick={(e) => e.preventDefault()}>
          <Input
            onChange={emailChangeHandler}
            placeholder="ایمیل"
            bordered
            type="email"
            className="text-center"
            endContent={<EnvelopeIcon className="h-7 w-7 text-gray-400" />}
          />
          <Button
            onClick={() => sendResetPassword(email!)}
            type="submit"
            className="my-3 w-full btn-primary"
            color="primary"
            isLoading={loading}
            isDisabled={!isEmailValid}
          >
            ارسال لینک
          </Button>
        </form>
      </div>
    </div>
  );
}
