"use client";

import { Button } from "@/components/ui";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { WrapContainer } from "./WrapContainer";

interface WrapPageStaticProps {
  title?: string | null;
  children: React.ReactNode;
}

export const WrapPageStatic = ({ title, children }: WrapPageStaticProps) => {
  const router = useRouter();

  return (
    <main data-scroll-container className="_page-static flex h-full flex-col pb-8">
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
      <WrapContainer className="space-y-4">{children}</WrapContainer>
    </main>
  );
};
