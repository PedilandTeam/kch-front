import { Header } from "@/app/header";
import { Footer } from "@/app/footer";
import "@/styles/globals.css";
import Fonts from "@/config/fonts";
import { CountryNamespace } from "@/types/country";
import { API_ROUTES } from "@/routes";
import { ModalCountry } from "@/app/(Site)/layout/modalCountry";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Hotjar from "@/components/hotjar";
import { NextUIProvider } from "@nextui-org/react";
import { headers } from "next/headers";
import BottomMenu from "./[countryOrSlug]/(Community)/community/bottomMenu";
import { OffCanvas } from "./layout/offcanvas";

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
      <body className="min-h-screen overflow-x-hidden mt-3 sm:mt-0">
        <NextUIProvider>
          <Fonts />
          <Hotjar />

          <ModalCountry countries={countries} />
          <OffCanvas countries={countries} />
          <Header countries={countries}/>

          <Toaster />
          {children}
          <BottomMenu countries={countries} />
          <Footer />
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
