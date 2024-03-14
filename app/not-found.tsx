"use client";

import { Metadata } from "next";
import Image from "next/image";


export default function NotFound() {
  return (
    <div className="container max-w-[1144px] mx-auto mt-8">
      <div className="not-found min-h-[500px] flex flex-wrap justify-center items-center">
        <div className="wrap">
          <div className="flex justify-center">
            <Image
              src="/images/not-found-01.png"
              alt="404 Error Iamge"
              width={260}
              height={200}
            />
          </div>
          <h1 className="text-lg sm:text-2xl font-semibold text-center mt-4 text-yellow-900">
            متاسفانه چنین صفحه‌ای وجود نداره!
          </h1>
          <p className="text-blue-900 sm:text-lg my-3 text-center px-5 sm:px-0">
            و یا ممکنه بخاطر تغییرات وب‌سایت جدید کـوچـا آدرسش تغییر کرده باشه.
          </p>
          <p className="text-gray-600 text-center sm:text-lg font-light px-8 sm:px-0">
            با انتخاب کشور مورد نظرت می‌تونی به جستجو ادامه بدی.
          </p>
        </div>
      </div>
    </div>
  );
}
