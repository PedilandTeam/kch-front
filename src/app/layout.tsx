import { baseSiteMetadata } from "@/config/metadata";
import { SiteProvider } from "@providers";
import "@/styles/globals.css";
import type { Metadata } from "next";

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
      <body className="font-anjoman flex justify-center overflow-x-hidden bg-neutral-100 antialiased">
        <div className="_app relative min-h-dvh w-full max-w-[414px] bg-white shadow-lg">
          <SiteProvider>{children}</SiteProvider>
        </div>
      </body>
    </html>
  );
}
