"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function FallbackImage({
  src,
  fallback = "/images/countries/un-medium.webp",
  alt,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized
      priority
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
