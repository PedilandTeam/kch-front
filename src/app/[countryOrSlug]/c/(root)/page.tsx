import { swrKeys } from "@/hooks/swr/swrKeys";
import { fetchCountriesServer } from "@/sdk/countries.server";
import { fetchQuestionsServer } from "@/sdk/questions.server";
import { notFound } from "next/navigation";
import { SWRConfig, unstable_serialize } from "swr";

import {
  CommunityPageHeader,
  PageContainer,
  QuestionsSection,
  SiteBanner,
} from "@components";

type PageProps = {
  params: Promise<{ countryOrSlug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { countryOrSlug } = await params;
  const { page } = await searchParams;
  const countries = await fetchCountriesServer();
  const country = countries.find((c) => c.code === countryOrSlug);

  if (!country) {
    return notFound();
  }

  const pageNumber = Number(page ?? 1);
  const limit = 30;

  const key = swrKeys.questions({
    page: pageNumber,
    limit,
    countryCode: countryOrSlug,
  });

  const initial = await fetchQuestionsServer({
    countryCode: countryOrSlug,
    page: pageNumber,
    limit,
  });

  return (
    <PageContainer className="_community-page">
      <SiteBanner />

      <CommunityPageHeader country={country} countryOrSlug={countryOrSlug} />

      <SWRConfig value={{ fallback: { [unstable_serialize(key)]: initial } }}>
        <QuestionsSection countryCode={countryOrSlug} />
      </SWRConfig>
    </PageContainer>
  );
}
