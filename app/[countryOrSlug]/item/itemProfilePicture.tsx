import { PageNamespace } from "@/types/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type itemProfilePictureType = {
  pageData: Pick<PageNamespace.Page, "id" | "haveAvatar" | "profile">;
  height?: number;
  width?: number;
  className?: string;
};
export default function ItemProfilePicture({
  pageData,
  height,
  width,
  className,
}: itemProfilePictureType) {
  return (
    <Image
      loading="lazy"
      alt="logo"
      src={
        pageData.profile
          ? `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/${pageData.profile}`
          : "/images/list/logo/logo-placeholder-03.webp"
      }
      width={width ?? 160}
      height={height ?? 160}
      className={className}
    />
  );
}
