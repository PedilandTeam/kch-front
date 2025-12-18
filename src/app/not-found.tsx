"use client";

import { useHeader } from "@/store/useHeader";
import Image from "next/image";
import { useEffect } from "react";
import img from "@/assets/images/not-found.png";

export default function NotFound() {
  const { setIsNotFound } = useHeader();
  useEffect(() => {
    setIsNotFound(true);
    return () => {
      setIsNotFound(false);
    };
  }, []);

  return (
    <div className="_not-found flex h-full flex-1 items-center justify-center bg-blue-50/50">
      <div className="wrap">
        <div className="flex justify-center">
          <Image src={img} alt="404 Error Iamge" width={160} height={124} />
        </div>
        <h1 className="text-secondary mt-4 text-center text-lg font-medium">
          متاسفانه چنین صفحه‌ای وجود نداره!
        </h1>
      </div>
    </div>
  );
}
