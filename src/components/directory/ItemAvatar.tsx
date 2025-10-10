import type { Page } from "@/types/page";
import Image from "next/image";

type itemAvatarProps = {
  pageData: Pick<Page, "id" | "haveAvatar" | "profile">;
  height?: number;
  width?: number;
  className?: string;
};

export const ItemAvatar = ({
  pageData,
  height,
  width,
  className,
}: itemAvatarProps) => {
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
};
