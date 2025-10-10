"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import HeaderTitle from "./headerTitle";
import { Button } from "@components";

export default function HeaderMobile() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center lg:hidden">
      <Button
        onClick={goBack}
        className="btn-ghost rounded-full px-2 active:bg-gray-100 lg:hidden"
      >
        <ArrowRightIcon className="h-5 w-5 text-gray-500" />
      </Button>
      <HeaderTitle />
    </div>
  );
}
