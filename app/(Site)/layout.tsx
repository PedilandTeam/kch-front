// app/(Site)/layout.tsx

import { Footer } from "@/app/(Site)/layout/footer";
import { Header } from "@/app/(Site)/layout/header";
import { ModalCountry } from "@/app/(Site)/layout/modalcountry";
import Hotjar from "@/components/hotjar";
import Fonts from "@/config/fonts";
import { API_ROUTES } from "@/routes";
import "@/styles/globals.css";
import { CountryNamespace } from "@/types/country";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let countries: CountryNamespace.GET[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 20)).json();
  } catch (e) {
    console.log(e);
    throw new Error("error in get country");
  }

  return (
    <html lang="fa" dir="rtl" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden">
        <NextUIProvider>
        <Fonts />
        <Header countries={countries}>
          <ModalCountry countries={countries} />
        </Header>

        {children}

        <Footer />

        <Toaster />
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
        </NextUIProvider>
      </body>
    </html>
  );
}
