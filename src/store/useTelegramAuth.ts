import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';
import type { TelegramInitData } from '@/types/telegram';
import { parse } from '@telegram-apps/init-data-node';
import axios from 'axios';

type UseTelegramAuth = {
  userData: TelegramInitData | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUserData: (userData: TelegramInitData | undefined) => void;
  authenticate: (initDataRaw: string) => Promise<void>;
  clearUserData: () => void;
};

export const useTelegramAuth: UseBoundStore<StoreApi<UseTelegramAuth>> = create<UseTelegramAuth>(
  (set, get) => ({
    userData: undefined,
    isLoading: false,
    isAuthenticated: false,
    
    setUserData: (userData: TelegramInitData | undefined) => {
      set({ 
        userData, 
        isAuthenticated: !!userData?.user 
      });
    },
    
    authenticate: async (initDataRaw: string) => {
      if (!initDataRaw) return;
      
      set({ isLoading: true });
      
      try {
        // Parse the init data
        const parsedData = parse(initDataRaw);
        set({ 
          userData: parsedData, 
          isAuthenticated: !!parsedData.user 
        });

        console.log('initDataRaw', initDataRaw)
        
        // Send authentication request to backend
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/telegram/login`,
          { initData: initDataRaw }
        );
      } catch (error) {
        console.error('Telegram authentication failed:', error);
      } finally {
        set({ isLoading: false });
      }
    },
    
    clearUserData: () => {
      set({ 
        userData: undefined, 
        isAuthenticated: false 
      });
    },
  })
);