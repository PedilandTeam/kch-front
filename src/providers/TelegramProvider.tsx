'use client'
import React, { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import {
  init,
  useLaunchParams,
  useRawInitData,
  useSignal, // optional helper if you want reactive signals like backButton.isVisible
} from '@telegram-apps/sdk-react';

type TelegramContextValue = {
  initialized: boolean;
  initDataRaw?: string;
  initData?: Record<string, unknown> | undefined;
  launchParams?: any;
  error?: string | undefined;
};

const TelegramContext = createContext<TelegramContextValue | undefined>(undefined);

export function TelegramProvider({ children }: { children: ReactNode }) {
  // call init() once on mount (docs show calling init to initialize the package)
  useEffect(() => {
    try {
      init();
    } catch (err) {
      // init rarely throws, but be safe — we won't crash the app
      // You can add logging here.
      // eslint-disable-next-line no-console
      console.error('telegram sdk init failed', err);
    }
  }, []);

  // hooks provided by the package (they are exported; see docs)
  const rawInit = useRawInitData(); // returns the raw init data string or undefined
  const launchParams = useLaunchParams(); // parsed launch params (tgWebApp... fields)
  // you may also use useSignal for reactive signals (backButton, mainButton, etc.)

  // Parse raw init data defensively
  const parsedInit = useMemo(() => {
    if (!rawInit) return undefined;
    try {
      return JSON.parse(rawInit) as Record<string, unknown>;
    } catch {
      return undefined;
    }
  }, [rawInit]);

  const value = useMemo<TelegramContextValue>(() => {
    return {
      initialized: Boolean(rawInit || launchParams),
      initDataRaw: rawInit,
      initData: parsedInit,
      launchParams,
      error: rawInit && !parsedInit ? 'invalid init data json' : undefined,
    };
  }, [rawInit, parsedInit, launchParams]);

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
}

export function useTelegram() {
  const ctx = useContext(TelegramContext);
  if (!ctx) throw new Error('useTelegram must be used inside <TelegramProvider/>');
  return ctx;
}
