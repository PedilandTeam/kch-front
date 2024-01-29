'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/daisy/button';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { usePathname, useRouter } from 'next/navigation';
import titles from '../../account/titles';
import HeaderMobile from './header.mobile';

type HeaderProps = {
    children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
    return (
        <header className='flex h-16 w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:border-0 lg:px-6 lg:shadow-none'>
            <HeaderMobile />

            <Link className='hidden lg:block' href='/'>
                <Image
                    src='/images/logo.svg'
                    // width={isTop ? 195 : 174}
                    // height={isTop ? 54 : 48}
                    width={195}
                    height={54}
                    priority={true}
                    alt='Pediland Logo'
                    className='transition-all duration-75'
                />
            </Link>
            {children}

            <div className='hidden gap-x-2 lg:flex'>
                <Link href={'/'}>
                    <Button
                        className='btn-ghost btn-md px-5
                    '
                    >
                        رفتن به سایت
                    </Button>
                </Link>

                <Link href={'/account/ads/new'}>
                    <Button
                        className='btn-primary btn-md px-5
                    '
                    >
                        ثبت آگهی
                    </Button>
                </Link>
            </div>
        </header>
    );
};
