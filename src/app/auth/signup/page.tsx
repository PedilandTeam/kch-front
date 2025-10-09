"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@components/index";
import { MoveLeftIcon } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  return (
    <main className="login-bg flex h-screen flex-col items-center justify-between p-5">
      <div className="flex w-full justify-end">
        <Button
          variant="ghost"
          className="text-white [&_svg]:size-5"
          onClick={() => router.back()}
        >
          <MoveLeftIcon />
        </Button>
      </div>

      <div className="flex w-full flex-col space-y-2 rounded-3xl px-5 py-10 text-center">
        <h1 className="text-lg font-semibold text-white">ثبت نام کاربر جدید</h1>

        <p className="text-sm text-gray-300">
          از حساب کاربری گوگل خود استفاده کنید.
        </p>
        <Button
          className="mt-3 h-11 w-full rounded-full bg-gray-50"
          variant="outline"
        >
          <Image
            src="/images/icons/icon-google-g.png"
            alt="google"
            width={20}
            height={20}
          />
          ثبت نام با اکانت گوگل
        </Button>
      </div>
    </main>
  );
}
