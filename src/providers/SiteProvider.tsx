"use client";

import Script from "next/script";
import Hotjar from "@/components/hotjar";
import { Toaster } from "@/components/ui/sonner";
import { GTM_ID } from "@/lib/gtm";

export const SiteProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        theme="light"
        toastOptions={{
          className: "font-vazirmatn !important",
        }}
      />
      {process.env.NODE_ENV === "production" && (
        <>
          <Hotjar />
          {GTM_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          )}
        </>
      )}
    </>
  );
};
