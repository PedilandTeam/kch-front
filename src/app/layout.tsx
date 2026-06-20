import { baseSiteMetadata } from "@/config/metadata";
import { SiteProvider } from "@/providers/SiteProvider";
import { TelegramProvider } from "@/providers/TelegramProvider";
import { TelegramAuthProvider } from "@/providers/TelegramAuthProvider";
import { Vazirmatn } from "next/font/google";
import type { Metadata } from "next";

import "@/styles/globals.css";
import ScrollFix from "@/components/global/ScrollFix";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  ...baseSiteMetadata,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${vazirmatn.variable} h-full scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-neutral-800 antialiased sm:items-center sm:justify-start">
        <div className="_app scrollbar-thin relative flex min-h-screen w-full max-w-[414px] flex-col bg-white sm:overflow-y-auto">
          <ScrollFix />

          <TelegramProvider>
            <TelegramAuthProvider>
              <SiteProvider>{children}</SiteProvider>
            </TelegramAuthProvider>
          </TelegramProvider>
        </div>
      </body>
    </html>
  );
}
