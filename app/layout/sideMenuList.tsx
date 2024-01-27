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
        path: '/home',
        icon: <HomeIcon className="w-6 h-6 ml-2" />
    }, 
    {
        title: 'کسب و کارهای من',
        path: '/home/mybiz',
        icon: <BriefcaseIcon className="w-6 h-6 ml-2"/>
    },
    {
        title: 'نظرات کاربران',
        path: '/home/comments',
        icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6 ml-2"/>
    }
]