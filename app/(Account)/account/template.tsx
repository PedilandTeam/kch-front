'use client';

import React, { useEffect, useState } from 'react';
import SideMenu from '@app/layout/sideMenu';
import { usePathname } from 'next/navigation';
import { SideMenuList } from '@app/layout/sideMenuList';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuthCheck from '@/hooks/useAuthCheck';
import { useUser } from '@/store/useUser';
import UserDetails from './components/userDetails';
// import SideMenu from "../layout/side-menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [firstCheckPassed, setFirstCheckPassed] = useState<boolean>(false);
  const { setUser } = useUser();
  const [lastId, setLastId] = useState<string>('');
  const { isLoading, user, isNotVerified, isAuthenticated, error } =
    useAuthCheck();

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined' || isLoading) return;
    if (!isAuthenticated) {
      toast.error('لطفا وارد شوید');
      router.push('/login');
    } else {
      setFirstCheckPassed(true);
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (typeof isNotVerified == 'undefined' || isLoading) return;
    if (isNotVerified) {
      toast.error('باید اول ایمیل خودرا تایید کنید');
      router.push('verifyEmail');
    }
  }, [isNotVerified, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    if (lastId != user.id) {
      setLastId(user?.id);
      setUser(user);
    }
  }, [user, setUser, setLastId, lastId]);

  return (
    <div className={`grid gap-5 lg:grid-cols-12`}>
      <div className='lg:col-span-3'>
        <div className='hidden lg:block'>
          <UserDetails />
          <SideMenu SideMenuList={SideMenuList} />
        </div>
      </div>
      <div className='lg:col-span-9'>
        <div
          className={`${firstCheckPassed && (isLoading || !isAuthenticated) ? 'blur-md' : ''}  col-span-4 lg:col-span-3`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
