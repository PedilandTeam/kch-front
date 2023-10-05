import { PageNamespace } from "@/types/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type itemProfilePictureType = {
  pageData: PageNamespace.Page;
  height?: number;
  width?: number;
  className?: string;
};
export default function ItemProfilePicture ({
  pageData,
  height,
  width,
  className,
}: itemProfilePictureType) {
  return (
    <Image
      loading="lazy"
      alt="logo"
      src={pageData.haveAvatar ? `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/avatar.webp` : "/images/list/logo/logo-placeholder.webp"}
      width={width ?? 160}
      height={height ?? 160}
      className={className}
    />
  );
}
