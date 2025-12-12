"use client";

export const ssr = false;
export const dynamic = "force-dynamic";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  init,
  useLaunchParams,
  useRawInitData,
} from "@telegram-apps/sdk-react";

type TelegramContextValue = {
  initialized: boolean;
  initDataRaw?: string;
  initData?: Record<string, unknown>;
  launchParams?: any;
  error?: string;
};

const TelegramContext = createContext<TelegramContextValue | undefined>(
  undefined,
);

export function TelegramProvider({ children }: { children: ReactNode }) {
  // init only in client
  useEffect(() => {
    try {
      init();
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Telegram init failed:", err);
      }
    }
  }, []);

  let rawInit: string | undefined = undefined;
  let launchParams: any = undefined;

  // Hooks inside try/catch – required for Telegram SDK
  try {
    rawInit = useRawInitData();
    launchParams = useLaunchParams();
  } catch (error) {
    // During SSR these will fail (window missing)
    // But in client they will work
    rawInit = undefined;
    launchParams = undefined;
  }

  const parsedInit = useMemo(() => {
    if (!rawInit) return undefined;
    try {
      return JSON.parse(rawInit);
    } catch {
      return undefined;
    }
  }, [rawInit]);

  const value = useMemo(() => {
    return {
      initialized: Boolean(rawInit || launchParams),
      initDataRaw: rawInit,
      initData: parsedInit,
      launchParams,
      error: rawInit && !parsedInit ? "invalid json" : undefined,
    };
  }, [rawInit, parsedInit, launchParams]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const ctx = useContext(TelegramContext);
  if (!ctx)
    throw new Error("useTelegram must be used inside <TelegramProvider/>");
  return ctx;
}
