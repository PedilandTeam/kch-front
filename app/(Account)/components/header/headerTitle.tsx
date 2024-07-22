'use client';

import { usePathname } from 'next/navigation';
import titles from '../../account/titles';

export default function HeaderTitle() {
    const pathname = usePathname();

    if (pathname.match(new RegExp('^/account/ads/(.*)$'))) {
        return <p className='font-medium lg:hidden'>ویرایش آگهی</p>;
    }

    return <p className='font-medium lg:hidden'>{titles?.[pathname] || 'حساب کاربری'}</p>;
}
