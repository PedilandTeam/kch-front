"use client";

import useSWR from "swr";

import { QuestionsList } from "@/components/ui";
import { swrKeys } from "@/hooks/swr/swrKeys";

type QuestionsSectionProps = {
  countryCode?: string;
};

export const QuestionsSection = ({ countryCode }: QuestionsSectionProps) => {
  const { data, error, isLoading } = useSWR(
    swrKeys.questions({ countryCode, page: 1, limit: 30 }),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <QuestionsList data={data?.items ?? []} countryOrSlug={countryCode} />;
};
