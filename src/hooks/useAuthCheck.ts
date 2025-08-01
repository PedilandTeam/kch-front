import { axiosFetcher } from "@/swr/axiosFetcher";
import { IUser } from "@/types/user";
import useSWR from "swr";

type UserError = { statusCode: number | 401 };
export default function useAuthCheck() {
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR<IUser>(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user/check`,
    axiosFetcher
  );

  return {
    user: userData ? userData : null,
    isAuthenticated: userError ? false : true,
    isVerified: (userData as IUser)?.emailVerified ? true : false,
    isLoading: !userData && !userError,
    error: userError,
  };
}
