'use client';

import React, { useEffect, useRef, useState } from 'react';
import SideMenu from '@app/layout/sideMenu';
import { SideMenuList } from '@app/layout/sideMenuList';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUser } from '@/store/useUser';
import UserDetails from './components/userDetails';
import Overview from './components/overview';
import NoAds from './components/noAds';
import Button from '@/components/daisy/button';
// import SideMenu from "../layout/side-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { setUser } = useUser();
    const { user, isVerified, isLoading, isAuthenticated, error } = useAuthCheck();

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

    if (isLoading || !isAuthenticated || !isVerified) {
        return (
            <div className='flex h-[70vh] w-full flex-col items-center justify-center gap-y-4'>
                <p className='animate-pulse text-2xl font-bold text-primary'>
                    درحال بارگذاری...
                </p>
                <div className='loading loading-dots loading-lg animate-pulse text-primary'></div>
            </div>
        );
    }

    return (
        <div className={`grid w-full gap-5 lg:grid-cols-12`}>
            <div className='lg:col-span-3'>
                <div className='hidden lg:block'>
                    <UserDetails />
                    <SideMenu SideMenuList={SideMenuList} />
                </div>
            </div>
            <div className='lg:col-span-9'>
                <div
                // className={`${firstCheckPassed && (isLoading || !isAuthenticated) ? 'blur-md' : ''} col-span-5 flex flex-col items-center justify-center lg:col-span-3 lg:block`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
