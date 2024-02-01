'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/daisy/button';
import { usePathname } from 'next/navigation';
import HeaderMobile from './header.mobile';
import titles from '../../account/titles';
import { useState, useEffect } from 'react';

type HeaderProps = {
    children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
    const pathname = usePathname();

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!window) return;
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <header
            className={`fixed right-0 top-0 z-30 bg-white transition-all duration-300 lg:static lg:flex ${isVisible ? 'visible opacity-100' : 'invisible opacity-0 lg:visible lg:opacity-100'} flex h-16 w-full items-center justify-between border-b bg-white px-4 py-3 shadow-sm lg:border-0 lg:px-6 lg:shadow-none`}
        >
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

                {!pathname.startsWith('/account/ads/new') ? (
                    <Link href={'/account/ads/new'}>
                        <Button
                            className='btn-primary btn-md px-5
                    '
                        >
                            ثبت آگهی
                        </Button>
                    </Link>
                ) : null}
            </div>
        </header>
    );
};
