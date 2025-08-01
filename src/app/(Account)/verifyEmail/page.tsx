import { cookies } from 'next/headers';
import VerifyEmailForm from './form';
import { redirect } from 'next/navigation';
import { UserModule } from '@/modules/user.module';

export default async function VerifyEmailPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    const userModule = new UserModule(token || null);
    await userModule.fetchUser().catch((e) => {
        console.log(e);
        if (e.response?.status === 401) {
            redirect('/login');
        }
    });

    if (!userModule.authenticated()) {
        redirect('/login?notAuthenticated');
    }

    if (userModule.verified()) {
        redirect('/account?alreadyVerified');
    }

    if (userModule.user?.email)
        return <VerifyEmailForm email={userModule.user?.email} />;
}
