declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_URL: string;
      FRONT_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_DL_URL: string;
      NEXT_PUBLIC_FRONT_URL: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V3: string;
      NOTIFER_KEY: string;
      NOTIFER_URL: string;
      PORT: string;
      RECAPTCHA_SECRET_KEY: string;
      REDIS_URL: string;
      REVALIDATE_DEFAULT: string;
      TEL_API_URL: string;
      TEL_BOT_TOKEN: string;
      NEXT_PUBLIC_HERE_API_URL: string;
      NEXT_PUBLIC_HERE_API_KEY: string;
      MAX_FILE_ACCEPT: string;
      NEXT_PUBLIC_CHECKAUTH_URL: string;
    }
  }
}

export {};
