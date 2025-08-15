// src/components/Community/QuestionsPage.tsx
"use client";

import useSWR from "swr";
import { axiosZodFetcher } from "@/lib/swr/axiosZodFetcher";
import { QuestionsResponseSchema } from "@/lib/schemas/community";

import { QuestionsList } from "@/components/index";

type QuestionsSectionProps = {
  swrKey: string;
  countryCode?: string;
};

export const QuestionsSection = ({
  swrKey,
  countryCode,
}: QuestionsSectionProps) => {
  const { data, error, isLoading } = useSWR(
    swrKey,
    axiosZodFetcher(QuestionsResponseSchema),
    {
      keepPreviousData: true,
      revalidateOnFocus: true,
      dedupingInterval: 1000,
    },
  );

  if (error)
    return <div className="text-red-600 text-center">Failed to load questions</div>;
  if (!data && isLoading) {
    return <div className="p-4 text-center">Loading…</div>;
  }

  return <QuestionsList data={data?.items ?? []} countryOrSlug={countryCode} />;
};
