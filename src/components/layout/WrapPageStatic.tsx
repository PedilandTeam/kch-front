"use client";

import { useRouter } from "next/navigation";

import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { WrapContainer } from "@/components/layout/WrapContainer";
import { Button } from "@/components/ui";
import { MoveLeftIcon } from "lucide-react";

interface WrapPageStaticProps {
  title?: string | null;
  children: React.ReactNode;
}

export const WrapPageStatic = ({ title, children }: WrapPageStaticProps) => {
  const router = useRouter();

  return (
    <main
      data-scroll-container
      className="_page-static flex flex-1 flex-col pb-8"
    >
      <div className="sticky top-0 z-10 flex h-14 items-center justify-between bg-white px-4">
        <h4 className="text-primary font-semibold">{title || ""}</h4>
        <Button
          variant={"ghost"}
          onClick={() => router.back()}
          className="pl-0!"
        >
          بازگشت
          <MoveLeftIcon />
        </Button>
      </div>
      <WrapContainer className="flex flex-1 space-y-4">
        {children}
      </WrapContainer>

      <TelegramBanner className="mt-6" />
    </main>
  );
};
