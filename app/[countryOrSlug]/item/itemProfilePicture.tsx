"use client";

import { PageNamespace } from "@/types/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type itemProfilePictureType = {
  pageData: PageNamespace.Page;
  height?: number;
  width?: number;
  className?: string;
};
export default function ({
  pageData,
  height,
  width,
  className,
}: itemProfilePictureType) {
  const [src, setSrc] = useState<string>(
    `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/avatar.webp`
  );
  const onImageError = () => {
    setSrc("/images/list/logo/logo-placeholder.webp");
  };
  return (
    <Image
      loading="lazy"
      alt="logo"
      src={src}
      onError={onImageError}
      width={width ?? 160}
      height={height ?? 160}
      className={className}
    />
  );
}
