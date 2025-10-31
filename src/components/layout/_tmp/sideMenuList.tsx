import React from "react";
import type { SideMenuItem } from "../../panel/tmp/sideMenu";
import { BriefcaseIcon, ChatTextIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";

export const SideMenuList: SideMenuItem[] = [
  {
    title: "خانه",
    path: "/account",
    icon: <HouseIcon className="ml-2 h-6 w-6" />,
    isMain: true,
  },
  {
    title: "آگهی‌های من",
    path: "/account/ads",
    icon: <BriefcaseIcon className="ml-2 h-6 w-6" />,
    isMain: false,
  },
  {
    title: "آمار",
    path: "/account/stats",
    icon: <ChatTextIcon className="ml-2 h-6 w-6" />,
    isMain: false,
  },
];
