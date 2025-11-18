"use client";

import { Loader } from "@/components/ui-custom/Loader";
import { useTelegramAuth } from "@/store/useTelegramAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const router = useRouter();
  const { userData, isLoading, isAuthenticated } = useTelegramAuth();
  console.log(userData);

  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex min-h-screen flex-col gap-5 p-5">{children}</main>
  );
}
