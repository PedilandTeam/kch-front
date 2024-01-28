import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const login = async (usernameOrEmail: string, password: string) => {
    setLoading(true);

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/login`, {
      method: 'POST',
      body: JSON.stringify({
        usernameOrEmail: usernameOrEmail,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(async (res) => {
        setLoading(false);
        const json = await res.json();
        return { res, json };
      })
      .catch((e) => {
        setLoading(false);
        throw new e();
      });
  };

  return { login, loading };
}
