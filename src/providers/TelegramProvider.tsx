"use client";

export const ssr = false;
export const dynamic = "force-dynamic";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  init,
  retrieveLaunchParams,
  retrieveRawInitData,
  type RetrieveLPResult,
} from "@telegram-apps/sdk-react";
import { parseInitData } from "@/lib/parseTelegramInitData";

type TelegramContextValue = {
  initialized: boolean;
  initDataRaw?: string;
  initData?: Record<string, unknown>;
  launchParams?: RetrieveLPResult;
  error?: string;
};

const defaultValue: TelegramContextValue = {
  initialized: false,
};

const TelegramContext = createContext<TelegramContextValue | undefined>(
  undefined,
);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [telegramState, setTelegramState] =
    useState<TelegramContextValue>(defaultValue);

  useEffect(() => {
    let cleanup: VoidFunction | undefined;

    try {
      const launchParams = retrieveLaunchParams();
      const rawInit = retrieveRawInitData();

      cleanup = init({ launchParams });

      setTelegramState({
        initialized: true,
        initDataRaw: rawInit,
        initData: rawInit ? parseInitData(rawInit) : undefined,
        launchParams,
      });
    } catch (error) {
      setTelegramState({
        initialized: false,
        error: error instanceof Error ? error.message : "telegram unavailable",
      });
    }

    return () => {
      cleanup?.();
    };
  }, []);

  const value = useMemo(() => telegramState, [telegramState]);

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
