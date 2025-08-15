// src/app/(Site)/[countryOrSlug]/c/[questionId]/page.tsx
import { swrKeys } from "@/lib/swr/swrKeys";
import { fetchCountryByCode } from "@/sdk/country.server";
import { fetchQuestionServer } from "@/sdk/forum.server";
import { notFound } from "next/navigation";
import { SWRConfig } from "swr";

import { QuestionDetailsSection } from "@/components/index";

type PageProps = {
  params: Promise<{
    countryOrSlug: string;
    questionId: string;
    topicId: string;
    limit: number;
    page: number;
  }>;
};

export default async function Page({ params }: PageProps) {
  const p = await Promise.resolve(params);

  const countryOrSlug = p.countryOrSlug;
  const questionId = p.questionId;
  const topicId = p.topicId;
  const limit = p.limit;
  const page = p.page;

  const country = await fetchCountryByCode(countryOrSlug);
  if (!country) return notFound();
  const countryCode = country.code;

  const qKey = swrKeys.question({ questionId, countryCode });

  const question = await fetchQuestionServer({ id: questionId });

  if (!question) return notFound();

  return (
    <SWRConfig value={{ fallback: { [qKey]: question } }}>
      <div>
        <QuestionDetailsSection question={question} />
      </div>
    </SWRConfig>
  );
}
