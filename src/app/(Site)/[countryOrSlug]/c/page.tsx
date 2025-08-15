// src/app/(Site)/[countryOrSlug]/c/page.tsx

import { swrKeys } from "@/lib/swr/swrKeys";
import { fetchCountryByCode } from "@/sdk/country.server";
import { fetchQuestionsServer } from "@/sdk/forum.server";
import { notFound } from "next/navigation";
import { SWRConfig } from "swr";

import {
  CommunityPageHeader,
  PageContainer,
  QuestionsSection,
  SiteBanner,
} from "@/components/index";

type PageProps = {
  params: Promise<{ countryOrSlug: string }>;
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const [sp, cp] = await Promise.all([searchParams, params]);
  const country = await fetchCountryByCode(cp.countryOrSlug);

  if (!country) return notFound();

  const page = Number(sp.page ?? 1);
  const limit = 30;
  const p = { countryCode: country.code, page, limit };
  const initial = await fetchQuestionsServer(p);
  const key = swrKeys.questions(p);

  return (
    <PageContainer className="_community-page">
      <SiteBanner />
      
      <CommunityPageHeader country={country} countryOrSlug={country.code} />

      <SWRConfig value={{ fallback: { [key]: initial } }}>
        <QuestionsSection swrKey={key} countryCode={country.code} />
      </SWRConfig>
    </PageContainer>
  );
}
