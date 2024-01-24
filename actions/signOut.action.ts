'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const cookieConfig = {
    httpOnly: true,
    path: '/',
    // secure: true,
    domain: '.koochaa.com',
    sameSite: 'strict',
    expires: 1,
};

export default async function signOutAction() {

    const cookieStore = cookies()
    cookieStore.set('token', '', cookieConfig as any)
    redirect('/')
}