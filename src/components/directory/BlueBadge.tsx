"use client";

import type { Page } from "@/types/page";

import { ShieldCheckIcon } from "@phosphor-icons/react";
import { BlueBadgeDialog, Button } from "@components";
import { useState } from "react";
import { BadgeCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlueBadgeProps {
  enable: boolean;
  pageData: Page;
  icon?: boolean;
}

export const BlueBadge = ({ enable, pageData, icon }: BlueBadgeProps) => {
  const [open, setOpen] = useState(false);

  if (!enable) return null;

  return (
    <>
      <BlueBadgeDialog
        open={open}
        onOpenChange={setOpen}
        verifyDate={pageData.verifyDate}
        updateDate={pageData.updateDate}
        createdDate={pageData.createdDate}
      />

      <Button
        className={cn(
          "gap-1 text-xs font-normal",
          icon
            ? "h-auto bg-transparent !p-0 text-blue-500 hover:bg-transparent hover:text-blue-600"
            : "bg-blue-500/80",
        )}
        size="sm"
        onClick={() => setOpen(true)}
      >
        <BadgeCheckIcon className={cn(icon ? "size-4.5" : "size-5")} />
        {!icon && "تایید شده"}
      </Button>
    </>
  );
};
