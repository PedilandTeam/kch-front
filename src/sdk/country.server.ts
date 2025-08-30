export async function fetchCountryByCode(id: number) {
  const baseUrl = process.env.API_URL;
  if (!baseUrl) throw new Error("Missing API_URL in env");

  const res = await fetch(`${baseUrl}/countries/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch country (SSR). ${res.status}: ${body}`);
  }

  return res.json();
}
