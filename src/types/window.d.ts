export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
        version: string;
        platform: string;

        ready: () => void;
        expand: () => void;
        close: () => void;

        themeParams: any;
        colorScheme: string;

        enableClosingConfirmation?: () => void;
        disableClosingConfirmation?: () => void;

        disableVerticalSwipe?: () => void;

        // Optional buttons
        MainButton?: {
          text: string;
          color?: string;
          textColor?: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          enable: () => void;
          disable: () => void;
          setText: (text: string) => void;
          onClick: (callback: () => void) => void;
        };

        BackButton?: {
          isVisible: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
        };
      };
    };
  }
}
