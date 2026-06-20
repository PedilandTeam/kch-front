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

    img.onload = () => setImageUrl(mainUrl);
    img.onerror = () => setImageUrl(fallbackUrl);
  }, [country.code]);

  return (
    <main
      className={cn(
        "_page-image relative flex h-full w-full flex-1 pb-20",
        className,
      )}
    >
      <div className="_mask absolute top-0 flex max-h-[540px] w-full items-end justify-center">
        <div className="relative aspect-[414/198] w-full">
          <NextImage
            src={imageUrl}
            alt="Mask"
            className="object-cover"
            fill
            sizes="414px"
            priority
          />
          <div className="absolute inset-0">
            <NextImage
              src="/images/hp-image-mask.webp"
              alt="Mask"
              className="object-cover"
              fill
              sizes="414px"
              priority
            />
          </div>
        </div>
      </div>
      <div className="z-10 flex w-full flex-1 flex-col gap-6 pt-5">
        {children}
      </div>
    </main>
  );
};
