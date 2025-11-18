'use client'

import LoginForm from './form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthCheck from '@/hooks/useAuthCheck';
import { mutate } from 'swr';
import { Loader } from '@/components/ui-custom/Loader';

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

    if(isLoading) {
        return <Loader/>
    }

    if(!isAuthenticated)
    return <LoginForm />;
};
export default LoginPage;
