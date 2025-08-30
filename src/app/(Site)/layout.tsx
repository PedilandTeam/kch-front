import Hotjar from "@/components/hotjar";
import { baseSiteMetadata } from "@/config/metadata";
import SiteProviders from "@/Providers/SiteProviders";
import "@/styles/globals.css";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  ...baseSiteMetadata,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className="flex justify-center overflow-x-hidden bg-neutral-100 antialiased">
        <div className="_app relative min-h-dvh w-full max-w-[414px] bg-white shadow-lg">
          <SiteProviders>{children}</SiteProviders>

          {/* <Footer /> */}
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
        </div>
      </body>
    </html>
  );
}
