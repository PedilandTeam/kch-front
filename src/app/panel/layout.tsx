"use client";

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

  const { userData } = useTelegramAuth();
  // const router = useRouter();
  console.log(userData);

  // useEffect(() => {
  //   if (!isLoading && isAuthenticated === false) {
  //     router.replace("/");
  //   }
  // }, [isAuthenticated, isLoading]);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <main className="flex min-h-screen flex-col gap-5 p-5">{children}</main>
  );
}
