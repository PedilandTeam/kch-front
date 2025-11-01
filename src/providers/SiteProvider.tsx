"use client";

import Script from "next/script";
import Hotjar from "@/components/hotjar";
import { Toaster } from "@/components/ui/sonner";
import { SwrProvider } from "@/lib/swr";

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SwrProvider>
      {children}

      <Toaster
        position="top-right"
        richColors
        theme="light"
        toastOptions={{
          className: "font-anjoman !important",
        }}
      />

      {process.env.NODE_ENV === "production" && (
        <>
          <Hotjar />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-EED4RG3GPD" />
          <Script id="google-analytics">
            {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-EED4RG3GPD');
                `}
          </Script>
        </>
      )}
    </SwrProvider>
  );
};
