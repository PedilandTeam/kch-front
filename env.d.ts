declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      API_URL: string;
      TEL_BOT_TOKEN: string;
      TEL_API_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_DL_URL: string;
      NEXT_PUBLIC_FRONT_URL: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      RECAPTCHA_SECRET_KEY: string;
      NOTIFER_URL: string;
      NOTIFER_KEY: string;
      REVALIDATE_DEFAULT: string;
      REDIS_URL: string;
      API_KEY: string;
      FRONT_URL: string;
      NEXT_PUBLIC_DAYS_AS_NEW: string;
      NEXT_PUBLIC_BIZ_FRONT_URL: string;
    }
  }
}

export {};
