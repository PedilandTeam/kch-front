"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container max-w-[1144px] mx-auto mt-8">
      <div className="not-found min-h-[500px] flex flex-wrap justify-center items-center">
        <div className="wrap">
          <div className="flex justify-center">
            <Image
              src="/images/not-found.png"
              alt="404 Error Iamge"
              width={420}
              height={266}
            />
          </div>
          <h1 className="text-[26px] font-bold text-center mt-4 text-pink-900">متاسفانه صفحه موردنظرتون پیدا نشد.</h1>
          <p>ممکن است این صفحه حذف شده باشد یا وجود نداشته باشد</p>
        </div>
      </div>
    </div>
  );
}
