"use client";

import type { Page } from "@/types/page";

import { ShieldCheckIcon } from "@phosphor-icons/react";
import { BlueBadgeDialog, Button } from "@components";
import { useState } from "react";
import { BadgeCheckIcon } from "lucide-react";

interface BlueBadgeProps {
  enable: boolean;
  pageData: Page;
}

export const BlueBadge = ({ enable, pageData }: BlueBadgeProps) => {
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
        className="gap-1 bg-blue-500/80 text-xs font-normal"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <BadgeCheckIcon className="size-5" />
        تایید شده
      </Button>
    </>
  );
};
