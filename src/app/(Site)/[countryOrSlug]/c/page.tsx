// src/app/(Site)/[countryOrSlug]/c/page.tsx

import { Country } from "@/types/country";
import { notFound } from "next/navigation";

// UI Imports
import CommunityHeader from "@/components/community/communityHeader";
import QuestionCard from "@/components/community/questionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PageProps = {
  params: Promise<{ countryOrSlug: string }>;
};

async function getCountry(countryOrSlug: string): Promise<Country> {
  const res = await fetch(
    `${process.env.API_URL}/countries?code=${countryOrSlug}`,
  );
  if (!res.ok) notFound();
  const list: Country[] = await res.json();
  if (!list?.length) notFound();
  return list[0];
}

export default async function Page({ params }: PageProps) {
  const { countryOrSlug } = await params;
  const country = await getCountry(countryOrSlug);

  const qs = new URLSearchParams({
    limit: "30",
    page: "1",
    countryCode: country.code,
  });
  const qRes = await fetch(`${process.env.API_URL}/forum/questions?${qs}`);
  const questions = qRes.ok ? await qRes.json() : { items: [] };

  return (
    <div className="_community-page flex flex-col gap-3 pt-3">
      <CommunityHeader country={country} countryOrSlug={country.code} />

      <div>
        <div className="container">
          <div className="flex items-center gap-2">
            <Input placeholder="جستجو..." />
            <div>
              <Button>سوال بپرس</Button>
            </div>
          </div>
        </div>
      </div>

      <QuestionCard
        data={questions.items ?? []}
        countryOrSlug={countryOrSlug}
        country={country}
      />
    </div>
  );
}
