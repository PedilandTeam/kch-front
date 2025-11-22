"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollFix() {
  const pathname = usePathname();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      document
        .querySelectorAll("[data-scroll-container]")
        .forEach((el) => el.scrollTo(0, 0));
    });
  }, [pathname]);

  return null;
}
