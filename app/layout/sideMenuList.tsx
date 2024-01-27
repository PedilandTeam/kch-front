import React from "react";
import { SideMenuItem } from "./sideMenu";
import {
    HomeIcon,
    BriefcaseIcon,
    ChatBubbleBottomCenterTextIcon,
  } from "@heroicons/react/24/outline";

export const SideMenuList: SideMenuItem[] = [
    { 
        title: 'خانه',
        path: '/account',
        icon: <HomeIcon className="w-6 h-6 ml-2" />
    }, 
    {
        title: 'آگهی‌های من',
        path: '/account/ads',
        icon: <BriefcaseIcon className="w-6 h-6 ml-2"/>
    },
    {
        title: 'آمار',
        path: '/account/stats',
        icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6 ml-2"/>
    }
]