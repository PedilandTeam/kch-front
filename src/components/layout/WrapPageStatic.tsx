"use client";

import { Button } from "@components";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface WrapPageStaticProps {
  title?: string | null;
  children: React.ReactNode;
}

export const WrapPageStatic = ({ title, children }: WrapPageStaticProps) => {
  const router = useRouter();

  return (
    <main className="_page-static flex h-full flex-col gap-4 p-4 pb-8">
      <div className="flex items-center justify-between">
        <h4 className="text-primary font-semibold">{title || ""}</h4>
        <Button variant={"ghost"} onClick={() => router.back()}>
          بازگشت
          <MoveLeftIcon />
        </Button>
      </div>
      {children}
    </main>
  );
};
