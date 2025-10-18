import type { Country } from "@/schemas/country";

export async function fetchCountriesServer(): Promise<Country[]> {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("Missing API_URL in env");

  const res = await fetch(`${baseUrl}/countries`, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch countries (SSR). ${res.status}: ${body}`);
  }

  return res.json();
}
