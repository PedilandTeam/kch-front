// app/(Site)/layout.tsx

import Hotjar from "@/components/hotjar";

import { API_ROUTES } from "@/routes";
import "@/styles/globals.css";
import { Country } from "@/types/country";
import Script from "next/script";
import SiteProviders from "./providers";
import { AppMenu } from "@/components/index";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let countries: Country[] = [];

  try {
    const res = await API_ROUTES.COUNTRIES.GET_ALL({
      status: 1,
      revalidate: 86400, // 24h cache
    });

    if (res.ok) {
      countries = await res.json();
    } else {
      console.error(`Failed to fetch countries: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching countries", error);
  }

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className="flex justify-center overflow-x-hidden bg-neutral-100 antialiased">
        <div className="_app relative min-h-dvh w-full max-w-[414px] bg-white shadow-lg">
          {children}

          {/* <Footer /> */}

          <AppMenu countries={countries} />

          <SiteProviders />

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
