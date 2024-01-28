'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

export type SideMenuItem = {
  title: string;
  icon: React.ReactElement;
  path: string;
};
type SideMenu = {
  SideMenuList: SideMenuItem[];
};
export default function SideMenu({ SideMenuList }: SideMenu) {
  const activeClass =
    'flex items-center bg-gray-100 text-pink-800 p-3 rounded-md border border-dashed';
  const notActiveClass =
    'flex items-center group-hover:bg-gray-100 p-3 rounded-md border border-dashed border-white hover:border-gray-200 transition-all duration-300';
  const pathname = usePathname();
  return (
    <ul className='font-medium'>
      {SideMenuList.map((item, index) => {
        return (
          <li className='group mb-1' key={`menuItem-${index}`}>
            <Link
              href={item.path}
              className={pathname == item.path ? activeClass : notActiveClass}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
