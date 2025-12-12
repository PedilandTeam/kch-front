"use client";

import { useEffect, useState } from "react";

import { useLinkHandler } from "@/hooks/useLinkHandler";
import type { Page } from "@/types/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { CirclesFourIcon } from "@phosphor-icons/react";
import { BadgeCheckIcon, Share2Icon } from "lucide-react";

interface ItemTopMenuProps {
  pageData: Page;
}

export const ItemTopMenu = ({ pageData }: ItemTopMenuProps) => {
  const { shareHandler } = useLinkHandler({ pageData });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const TriggerButton = (
    <button type="button" className="h-auto rounded-none p-0!">
      <CirclesFourIcon
        weight="duotone"
        className="text-secondary size-6 cursor-pointer transition duration-300 hover:text-black"
      />
    </button>
  );

  if (!isMounted) {
    return TriggerButton;
  }

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>{TriggerButton}</DropdownMenuTrigger>
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
