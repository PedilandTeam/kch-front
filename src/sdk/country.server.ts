// src/sdk/country.server.ts

import "server-only";
import { Country } from "@/types/country";

const API_URL = process.env.API_URL!;
if (!API_URL) throw new Error("Missing API_URL");

export async function fetchCountryByCode(
  code: string,
): Promise<Country | null> {
  const url = `${API_URL}/countries?code=${encodeURIComponent(code)}`;

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 24, tags: ["countries"] }, // 24h ISR
  });

  if (!res.ok) throw new Error(`countries ${res.status}`);

  const data: unknown = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;

  const item = data[0] as Partial<Country>;
  // minimal structural guard
  if (!item || typeof item.code !== "string") return null;

  return item as Country;
}
