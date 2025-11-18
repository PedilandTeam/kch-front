import { create } from "zustand";
import type { TelegramInitData } from "@/types/telegram";
import { parseInitData } from "@/lib/parseTelegramInitData";
import axios from "axios";

type UseTelegramAuth = {
  userData: TelegramInitData | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUserData: (userData: TelegramInitData | undefined) => void;
  authenticate: (initDataRaw: string) => Promise<void>;
  clearUserData: () => void;
};

export const useTelegramAuth = create<UseTelegramAuth>((set) => ({
  userData: undefined,
  isLoading: true, // مهم!!!
  isAuthenticated: false,

  setUserData: (userData) => {
    set({
      userData,
      isAuthenticated: !!userData?.user,
      isLoading: false,
    });
  },

  authenticate: async (initDataRaw: string) => {
    if (!initDataRaw) {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      const parsedData = parseInitData(initDataRaw);

      set({
        userData: parsedData,
        isAuthenticated: !!parsedData.user,
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/telegram/login`,
        { initData: initDataRaw },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Telegram authentication failed:", error);
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  clearUserData: () => {
    set({
      userData: undefined,
      isAuthenticated: false,
      isLoading: false,
    });
  },
}));
