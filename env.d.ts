declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      FRONT_URL: string;
      NEXT_PUBLIC_FRONT_URL: string;
      NEXT_PUBLIC_BIZ_FRONT_URL: string;

      API_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_DL_URL: string;

      TEL_BOT_TOKEN: string;
      TEL_API_URL: string;

      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      RECAPTCHA_SECRET_KEY: string;

      NOTIFER_URL: string;
      NOTIFER_KEY: string;

      API_KEY: string;
      NEXT_PUBLIC_DAYS_AS_NEW: string;

      REVALIDATE_DEFAULT: string;
      REVALIDATE_SECRET: string;
      DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS: string;

      REDIS_URL: string;
    }
  }
}

export {};
