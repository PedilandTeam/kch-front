// src/components/Layout/AppMenuGate.tsx
"use client";

import { usePathname } from "next/navigation";
import { AppMenu } from "@components";
import type { Country } from "@/schemas/country";

export default function AppMenuGate({ countries }: { countries: Country[] }) {
  const pathname = usePathname();

  // hide on /:countryOrSlug/c/:questionId (e.g. /at/c/123)
  const hide =
    !!pathname &&
    /^\/[^/]+\/c\/[^/]+(\/.*)?$/.test(pathname); // هر چیزی با /xx/c/yyy شروع بشه

  if (hide) return null;
  return <AppMenu countries={countries} />;
}
