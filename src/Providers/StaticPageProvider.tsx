"use client";

import { Button } from "@/components/index";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface StaticPageProviderProps {
  title?: string | null;
  children: React.ReactNode;
}

export const StaticPageProvider = ({
  title,
  children,
}: StaticPageProviderProps) => {
  const router = useRouter();

  return (
    <main className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h4>{title || ""}</h4>
        <Button variant={"ghost"} onClick={() => router.push("/")}>
          بازگشت
          <MoveLeftIcon />
        </Button>
      </div>
      {children}
    </main>
  );
};
