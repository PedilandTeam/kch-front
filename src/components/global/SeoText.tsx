"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

import { Button } from "../ui";

export const SeoText = ({ children }: { children: React.ReactNode }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="_SEO-text-content mt-4 flex flex-col px-4">
      <div
        className={cn(
          "[&>p]:text-muted-foreground text-muted-foreground relative overflow-hidden text-justify text-sm duration-500 [&_strong]:font-medium [&>p]:mb-1 [&>p]:text-sm",

          showMore ? "h-auto" : "h-24",
        )}
      >
        <div
          className={cn(
            "absolute right-0 bottom-0 left-0 h-full",
            showMore ? "" : "bg-linear-to-t from-white to-transparent",
          )}
        ></div>
        {children}
      </div>
      <Button
        variant="link"
        className="text-[13px] text-gray-400"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "عدم نمایش" : "نمایش متن"}
      </Button>
    </div>
  );
};
