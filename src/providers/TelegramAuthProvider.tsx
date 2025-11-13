"use client";

import { useEffect } from "react";
import { useTelegram } from "./TelegramProvider";
import { useTelegramAuth } from "@/store/useTelegramAuth";

export function TelegramAuthProvider({ 
  children 
}: { 
  children: React.ReactNode;
}) {
  const { initDataRaw } = useTelegram();
  const { authenticate, userData } = useTelegramAuth();

  useEffect(() => {
    if (initDataRaw && !userData) {
      authenticate(initDataRaw);
    }
  }, [initDataRaw, userData, authenticate]);

  return <>{children}</>;
}