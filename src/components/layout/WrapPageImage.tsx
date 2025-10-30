"use client";

import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import { useEffect, useState } from "react";

interface WrapPageImageProps {
  className?: string;
  country: Country;
  children: React.ReactNode;
}

export const WrapPageImage = ({
  children,
  className,
  country,
}: WrapPageImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    `/images/directory/hero-bg-${country.code}.webp`,
  );

  useEffect(() => {
    const mainUrl = `/images/directory/hero-bg-${country.code}.webp`;
    const fallbackUrl = `/images/directory/hero-bg-un.webp`;

    const img = new Image();
    img.src = mainUrl;

    img.onload = () => setImageUrl(mainUrl); // اگه پیدا شد
    img.onerror = () => setImageUrl(fallbackUrl); // اگه پیدا نشد
  }, [country.code]);

  return (
    <main
      className={cn("_page-image flex flex-1 relative pb-8", className)}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-full flex-1 flex-col gap-8 pt-5">{children}</div>
    </main>
  );
};
