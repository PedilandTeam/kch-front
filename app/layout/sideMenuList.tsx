import React from 'react';
import { SideMenuItem } from './sideMenu';
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';

export const SideMenuList: SideMenuItem[] = [
  {
    title: 'خانه',
    path: '/account',
    icon: <HomeIcon className='ml-2 h-6 w-6' />,
  },
  {
    title: 'آگهی‌های من',
    path: '/account/ads',
    icon: <BriefcaseIcon className='ml-2 h-6 w-6' />,
  },
  {
    title: 'آمار',
    path: '/account/stats',
    icon: <ChatBubbleBottomCenterTextIcon className='ml-2 h-6 w-6' />,
  },
];
