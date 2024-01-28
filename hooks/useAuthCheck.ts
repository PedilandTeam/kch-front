import { fetcher } from '@/app/swr/fetcher';
import { IUser } from '@/types/user';
import axios, { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useAuthCheck() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [isNotVerified, setIsNotVerified] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>();
  const [error, setError] = useState<AxiosError>();
  const pathname = usePathname();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/check`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
        setIsNotVerified(!res.data.emailVerified);
      })
      .catch((e: any) => {
        if (e.response?.status == 401) {
          setIsAuthenticated(false);
        }
        console.log(e?.message);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      setIsAuthenticated(undefined);
      setIsNotVerified(undefined);
    }
  }, [isLoading]);

  useEffect(() => {
    if (user) {
      if ('statusCode' in user && user.statusCode === 401) {
        setIsAuthenticated(false);
        setIsNotVerified(false);
      } else if ('emailVerified' in user && !user.emailVerified) {
        setIsNotVerified(true);
        setIsAuthenticated(true);
      } else {
        setIsNotVerified(false);
        setIsAuthenticated(true);
      }
    }
  }, [user, isLoading]);

  return {
    user: isAuthenticated ? (user as IUser) : null,
    isLoading,
    error,
    isAuthenticated,
    isNotVerified,
  };
}
