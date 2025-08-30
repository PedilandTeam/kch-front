import { SWRConfig, SWRConfiguration } from "swr";
import { Fetcher, Key } from "swr";
import { api } from "@/hooks/swr/axios";
import { keyToUrl } from "@/hooks/swr/swrUrl";

const fetcher: Fetcher<unknown, Key> = async (
  key: Key,
  opts?: { signal?: AbortSignal },
) => {
  const url = Array.isArray(key)
    ? keyToUrl(key as readonly unknown[])
    : (key as string);
  return api.get(url, { signal: opts?.signal }).then((r) => r.data);
};

const swrBaseConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  keepPreviousData: true,

  onErrorRetry: (err, key) => {
    console.error(
      "[SWR onError]",
      key,
      (err as any)?.response?.status,
      (err as any)?.message,
    );
  },
};

export const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={swrBaseConfig}>{children}</SWRConfig>;
};
