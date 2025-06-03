// app/(Site)/layout.tsx
import { ModalCountry } from "@/app/(Site)/layout/modalcountry";
import Hotjar from "@/components/hotjar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Fonts from "@/config/fonts";
import { API_ROUTES } from "@/routes";
import "@/styles/globals.css";
import { CountryNamespace } from "@/types/country";
import Script from "next/script";
// UI Imports
import { Toaster } from "react-hot-toast";
import { MobileMenu } from "@/components/layout/MobileMenu";

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
      <body className="min-h-screen relative">
        <Fonts />

        <Hotjar />

        <Header countries={countries}>
          <ModalCountry countries={countries} />
        </Header>

        {children}

        <Footer />

        <MobileMenu />

        <Toaster />

        {/* GTM Script */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EED4RG3GPD" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-EED4RG3GPD');
        `}
        </Script>
      </body>
    </html>
  );
}
