"use client";

import Hotjar from "@/components/hotjar";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { SwrProvider } from "./SwrProvider";

export default function SiteProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SwrProvider>
      {children}

      <Toaster />

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
}
