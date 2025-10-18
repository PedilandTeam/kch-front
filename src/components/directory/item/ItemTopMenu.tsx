"use client";

import { useLinkHandler } from "@/hooks/useLinkHandler";
import type { Page } from "@/types/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components";
import { CirclesFourIcon } from "@phosphor-icons/react";
import { BadgeCheckIcon, FlagTriangleRight, Share2Icon } from "lucide-react";

interface ItemTopMenuProps {
  pageData: Page;
}

export const ItemTopMenu = ({ pageData }: ItemTopMenuProps) => {
  const { shareHandler } = useLinkHandler({ pageData });

  const handleOwnershipClick = () => {
    const telegramUsername = "koochaa_support";
    const pageUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`;
    const message = `سلام، وقت بخیر 👋
من مالک صفحه "${pageData.title}" هستم و تمایل دارم مدیریت اطلاعات این صفحه رو دریافت کنم.\n\n
${pageUrl}`;

    const encoded = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${telegramUsername}?text=${encoded}`;

    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <CirclesFourIcon
          size={26}
          weight="duotone"
          className="text-secondary cursor-pointer transition duration-300 hover:text-black"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={() => shareHandler()}>
          <Share2Icon />
          اشتراک گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOwnershipClick}>
          <BadgeCheckIcon />
          مالکیت صفحه
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <FlagTriangleRight />
          گزارش خطا
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
