"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useParamsChecker = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.has("alreadyVerified")) {
      toast.success("ایمیل شما قبلا تایید شده است");
      router.replace("/account");
    }
  }, [searchParams, router]);
};
