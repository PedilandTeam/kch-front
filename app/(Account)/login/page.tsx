import LoginForm from './form';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const LoginPage = async (param?: {
  searchParams?: { slug?: string; claimWay: string };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let haveAccess: boolean = true;

  if (token) {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/check`, {
        headers: {
          Cookie: `token=${token}`,
        },
      })
      .then((res) => {
        haveAccess = false;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  if (!haveAccess) {
    redirect('/account');
  }
  return <LoginForm />;
};
export default LoginPage;
