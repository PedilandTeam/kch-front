"use client";

import { GENERAL } from "@/text";
import type { Page } from "@/types/page";
import DeviceDetector from "device-detector-js";
import { toast } from "sonner";

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
  const detector = new DeviceDetector();
  const agent = detector.parse(navigator.userAgent);

  const shareHandler = () => {
    if (agent.device?.type == "desktop") {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`,
      );
      toast.success(GENERAL.URL_COPIED);
    } else {
      navigator.share({
        url: `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`,
      });
    }
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <CirclesFourIcon
          size={26}
          weight="duotone"
          className="text-secondary transition duration-300 hover:text-black"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem onClick={() => shareHandler()}>
          <Share2Icon />
          اشتراک گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BadgeCheckIcon />
          دریافت مالکیت
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FlagTriangleRight />
          گزارش صفحه
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
