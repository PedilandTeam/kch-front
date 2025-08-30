// src/lib/swr/axiosZodFetcher.ts
// Axios-based SWR fetcher with Zod validation

import axios from "axios";
import type { ZodType } from "zod";

/**
 * Axios + Zod fetcher for SWR.
 * - Sends cookies (withCredentials: true) for auth-aware APIs.
 * - Validates and types the response using the provided Zod schema.
 * - Throws on non-2xx responses so SWR's `error` is set properly.
 */
export const axiosZodFetcher =
  <T>(schema: ZodType<T>) =>
  async (url: string): Promise<T> => {
    const res = await axios.get(url, { withCredentials: true });
    // NOTE: If your API wraps data (e.g., { data: ... }), adjust here.
    return schema.parse(res.data);
  };
