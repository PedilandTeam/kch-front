import { baseSiteMetadata } from "@/config/metadata";
import SiteProviders from "@/providers/SiteProviders";
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
      <body className="flex justify-center overflow-x-hidden bg-neutral-100 antialiased font-anjoman">
        <div className="_app relative min-h-dvh w-full max-w-[414px] bg-white shadow-lg">
          <SiteProviders>{children}</SiteProviders>
        </div>
      </body>
    </html>
  );
}
