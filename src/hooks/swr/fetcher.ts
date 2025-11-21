// This is a part of New Structure
import { api } from "@/api/client";

export const fetcher = (url: string) => api.get(url);
