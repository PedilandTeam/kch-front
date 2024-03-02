'use client'

import useAuthCheck from '@/hooks/useAuthCheck';
import RegisterForm from './form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { mutate } from 'swr';
import Loading from '../components/global/loading';


const RegisterPage =  () => {
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
        return <Loading/>
    }

    if(!isAuthenticated)
    return <RegisterForm />;
};
export default RegisterPage;
