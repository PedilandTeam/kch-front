import { baseSiteMetadata } from "@/config/metadata";
import { SiteProvider } from "@/providers/SiteProvider";
import { TelegramProvider } from "@/providers/TelegramProvider";
import { TelegramAuthProvider } from "@/providers/TelegramAuthProvider";
import "@/styles/globals.css";
import { Vazirmatn } from "next/font/google";
import type { Metadata } from "next";

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
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} scroll-smooth`}>
      <body className="flex justify-center overflow-x-hidden bg-neutral-100 antialiased">
        <div className="_app relative flex min-h-dvh w-full max-w-[414px] flex-col bg-white shadow-lg">
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
