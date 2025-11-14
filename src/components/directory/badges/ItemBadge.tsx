"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Page } from "@/types/page";

import {
  CrownIcon,
  SealCheckIcon,
  SealWarningIcon,
} from "@phosphor-icons/react";
import { BadgeBlueDialog } from "./BadgeBlueDialog";
import { BadgeOrangeDialog } from "./BadgeOrangeDialog";

interface ItemBadgeProps {
  pageData: Page;
  hide?: boolean;
  size?: "default" | "sm";
}

export const ItemBadge = ({
  pageData,
  hide,
  size = "default",
}: ItemBadgeProps) => {
  const [blueDialogOpen, setBlueDialogOpen] = useState(false);
  const [orangeDialogOpen, setOrangeDialogOpen] = useState(false);

  if (hide) return null;

  const isVerified = pageData?.business;
  const isSpecial = !pageData?.status;

  const badgeConfig = !isVerified
    ? {
        icon: SealWarningIcon,
        color: "text-orange-500 hover:text-orange-600",
        onClick: () => setOrangeDialogOpen(true),
      }
    : isSpecial
      ? {
          icon: CrownIcon,
          color: "text-yellow-500 hover:text-yellow-600",
          onClick: () => setBlueDialogOpen(true),
        }
      : {
          icon: SealCheckIcon,
          color: "text-blue-500 hover:text-blue-600",
          onClick: () => setBlueDialogOpen(true),
        };

  const Icon = badgeConfig.icon;
  const iconSize = size === "sm" ? 18 : 24;

  return (
    <>
      <BadgeBlueDialog
        open={blueDialogOpen}
        onOpenChange={setBlueDialogOpen}
        verifyDate={pageData.verifyDate}
        updateDate={pageData.updateDate}
        createdDate={pageData.createdDate}
        isSpecial={isSpecial}
      />

      <BadgeOrangeDialog
        open={orangeDialogOpen}
        onOpenChange={setOrangeDialogOpen}
      />

      <Icon
        size={iconSize}
        weight="duotone"
        onClick={badgeConfig.onClick}
        className={cn(
          badgeConfig.color,
          "transition-colors hover:cursor-pointer",
        )}
      />
    </>
  );
};
