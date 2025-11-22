// This is a part of New Structure
import { api } from "@/api/client";

export const fetcher = <T = any>(url: string): Promise<T> =>
  api.get(url) as Promise<T>;
