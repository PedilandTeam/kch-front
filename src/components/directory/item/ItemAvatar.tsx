import { cn } from "@/lib/utils";
import type { Page } from "@/types/page";
import Image from "next/image";
import placeholderImg from "@/assets/images/logo-placeholder.webp";

type itemAvatarProps = {
  pageData: Pick<Page, "id" | "haveAvatar" | "profile">;
  className?: string;
};

export const ItemAvatar = ({ pageData, className }: itemAvatarProps) => {
  return (
    <Image
      alt="logo"
      src={
        pageData.profile
          ? `${process.env.NEXT_PUBLIC_DL_URL}/pages/${pageData.id}/${pageData.profile}`
          : placeholderImg
      }
      width={100}
      height={100}
      className={cn(className || "h-20 w-20", "rounded-full")}
      priority
    />
  );
};
