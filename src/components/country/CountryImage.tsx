"use client";

import Image from "next/image";
import { useState } from "react";

interface CountryImageProps {
  countryCode: string;
  countryName: string;
}

export const CountryImage = ({ countryCode, countryName }: CountryImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(
    `/images/bd/${countryCode}-hp.webp`,
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageUrl(`/images/bd/un-hp.webp`);
    }
  };

  return (
    <Image
      className="aspect-square rounded-xl object-cover brightness-[.70]"
      src={imageUrl}
      width={430}
      height={600}
      alt={`یک تصویر از کشور ${countryName}`}
      priority
      onError={handleError}
    />
  );
};
