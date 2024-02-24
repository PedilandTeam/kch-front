'use client'

import { useUser } from '@/store/useUser';
import LoginForm from './form';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

const LoginPage = () => {

    const {isAuthenticated, isLoading} = useAuthCheck()
    const router = useRouter()

    useEffect(() => {
        if(!isLoading && isAuthenticated){
            mutate(process.env.NEXT_PUBLIC_CHECKAUTH_URL).then(() => {
                router.push('/account')
            })
        }
    }, [isAuthenticated, isLoading, router])

    return <LoginForm />;
};
export default LoginPage;
