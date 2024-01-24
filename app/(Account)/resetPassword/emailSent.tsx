"use client";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function EmailSent() {
  return (
    <div className="bg-simple-1 w-full h-full flex justify-center items-center">
      <div className="mx-3 sm:mx-auto text-center bg-white p-6 sm:p-8 border shadow rounded-xl">
        <CheckCircleIcon className=" text-green-500 h-16 mx-auto mb-3" />
        <div className=" flex flex-col gap-y-3">
          <p className="font-semibold text-2xl">لینک ارسال شد</p>
          <p>اگر ایمیل شما در سامانه ما ثبت شده باشد، ایمیل تغییر رمز برای شما ارسال خواهد شد</p>
          <p>لطفا برای ادامه فرآیند ایمیل خود را چک کنید.</p>
        </div>
      </div>
    </div>
  );
}
