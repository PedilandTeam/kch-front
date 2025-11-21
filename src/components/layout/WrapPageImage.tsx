"use client";

import { cn } from "@/lib/utils";
import type { Country } from "@/schemas";
import NextImage from "next/image";
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
    `/images/bd/${country.code}-hp.webp`,
  );

  useEffect(() => {
    const mainUrl = `/images/bd/${country.code}-hp.webp`;
    const fallbackUrl = `/images/bd/un-hp.webp`;

    const img = new Image();
    img.src = mainUrl;

    img.onload = () => setImageUrl(mainUrl); // اگه پیدا شد
    img.onerror = () => setImageUrl(fallbackUrl); // اگه پیدا نشد
  }, [country.code]);

  return (
    <main
      className={cn("_page-image relative flex w-full h-full flex-1 pb-20", className)}
    >
      <div className="_mask absolute top-0 flex w-full items-end justify-center max-h-[540px]">
        <div className="relative w-full">
          <NextImage
            src={imageUrl}
            alt="Mask"
            className="h-auto w-full object-cover"
            width={414}
            height={198}
            priority
          />
          <div className="absolute bottom-0 left-0 right-0">
            <NextImage
              src="/images/hp-image-mask.webp"
              alt="Mask"
              className="h-auto w-full object-cover"
              width={414}
              height={198}
              priority
            />
          </div>
        </div>
      </div>
      <div className="z-10 flex w-full flex-1 flex-col gap-8 pt-5">
        {children}
      </div>
    </main>
  );
};
