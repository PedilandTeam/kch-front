'use client';

import React, { useEffect, useRef, useState } from 'react';
import SideMenu from '@app/layout/sideMenu';
import { SideMenuList } from '@app/layout/sideMenuList';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
// import  from '@/hooks/useAuthCheck';
import { useUser } from '@/store/useUser';
import UserDetails from './components/userDetails';
import Overview from './components/overview';
import NoAds from './components/noAds';
import Button from '@/components/daisy/button';
import Loading from '@/app/(Account)/components/global/loading';
import useAuthCheck from '@/hooks/useAuthCheck';
// import SideMenu from "../layout/side-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setUser } = useUser();
    const { user, isVerified, isLoading, isAuthenticated, error } = useAuthCheck();
    const headerRef: React.MutableRefObject<HTMLDivElement | null> = useRef<(HTMLDivElement) | null>(null)
    const [headerHeight, setHeaderHeight] = useState<string>('h-[calc(100vh-4rem)]')

    useEffect(() => {
        if (isLoading) return;
        if (error && !isAuthenticated) {
            toast.error('لطفا وارد شوید');
            router.push('/login');
        }
    }, [error, isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (isLoading) return;
        if (user && !isVerified) {
            toast.error('باید اول ایمیل خودرا تایید کنید');
            router.push('verifyEmail');
        }
    }, [isVerified, isLoading, router, user]);

    useEffect(() => {
        if (!user) return;
            setUser(user);
    }, [user, setUser]);

    useEffect(() => {
        if (!document) return
        const header = document.getElementById('header') as HTMLDivElement
        if (header) {
            setHeaderHeight(`h-[calc(100vh-${header.clientHeight}px)]`)
        }
    }, [])

    if (isLoading || !isAuthenticated || !isVerified) {
        return (
            <Loading/>
        );
    }

 
    return (
        <div className={`grid w-full gap-5 lg:grid-cols-12`}>
            <div className='lg:col-span-3 w-full'>
                <div className={`hidden lg:flex lg:justify-center lg:items-center lg:flex-col w-full h-[calc(100vh-96px)]`}>
                    <SideMenu SideMenuList={SideMenuList} />
                    <UserDetails className='mt-auto'/>
                </div>
            </div>
            <div className='lg:col-span-9'>
                <div className='w-full'>
                    {children}
                </div>
            </div>
        </div>
    );
}
