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
    isMain: true
  },
  {
    title: 'آگهی‌های من',
    path: '/account/ads',
    icon: <BriefcaseIcon className='ml-2 h-6 w-6' />,
    isMain: false
  },
  {
    title: 'آمار',
    path: '/account/stats',
    icon: <ChatBubbleBottomCenterTextIcon className='ml-2 h-6 w-6' />,
    isMain: false
  },
];
