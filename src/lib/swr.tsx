// src/lib/swr.tsx
import { SWRConfig } from "swr";
import type { SWRConfiguration } from "swr";
import { api } from "./api";

/**
 * Converts SWR key (string or [endpoint, params]) to a URL string.
 */
function keyToUrl(key: string | readonly unknown[]): string {
  if (Array.isArray(key)) {
    const [endpoint, params] = key as [string, Record<string, any>];
    const query = new URLSearchParams();
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null && v !== "") {
          query.append(k, String(v));
        }
      }
    }
    const queryString = query.toString();
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  }
  return key as string;
}

/**
 * Custom fetcher that accepts both string and array keys.
 * ✅ Generic <T> declared directly in function definition.
 */
// const fetcher = async <T = unknown>(key: string | readonly unknown[]): Promise<T> => {
//   const url = keyToUrl(key);
//   const response = await api.get<T>(url);
//   return response.data;
// };

/**
 * Global SWR provider
 */
export const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  const config: SWRConfiguration = {
    fetcher,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    keepPreviousData: true,
    onError: (err) => console.error("SWR Error:", err),
  };

  return <SWRConfig value={config}>{children}</SWRConfig>;
};
