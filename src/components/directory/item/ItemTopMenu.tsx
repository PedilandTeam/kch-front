"use client";

import type { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CirclesFourIcon } from "@phosphor-icons/react";
import { BadgeCheckIcon, FlagTriangleRight, Share2Icon } from "lucide-react";
import { toast } from "sonner";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const ItemTopMenu = () => {
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("لینک صفحه کپی شد.");
    } catch (err) {
      console.error("Failed to copy:", err);
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
        <DropdownMenuItem onClick={() => handleCopy()}>
          <Share2Icon />
          اشتراک گذاری
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setShowPanel(!showPanel)}>
          <BadgeCheckIcon />
          دریافت مالکیت
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setShowActivityBar(!showActivityBar)}>
          <FlagTriangleRight />
          گزارش صفحه
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
