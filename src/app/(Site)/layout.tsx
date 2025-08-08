// app/(Site)/layout.tsx

import { DialogCountry } from "@/app/(Site)/layout/dialogCountry";
import { Footer } from "@/app/(Site)/layout/footer";
import { Header } from "@/app/(Site)/layout/header";
import Hotjar from "@/components/hotjar";
import { API_ROUTES } from "@/routes";
import "@/styles/globals.css";
import { Country } from "@/types/country";
import Script from "next/script";
import MobileMenu from "./layout/appMenu";
import SiteProviders from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let countries: Country[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 20)).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className="flex justify-center overflow-x-hidden bg-neutral-100 antialiased">
        <div className="relative min-h-dvh w-full max-w-[414px] bg-white shadow-lg">
          <Header countries={countries} />

          {children}

          <Footer />

          <MobileMenu countries={countries} />

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
