// src/components/Community/QuestionsList.tsx
"use client";

import { QuestionCard, QuestionsTools } from "@/components/index";
import { Question } from "@/lib/schemas/community";
import type { Country } from "@/types/country";

type QuestionsListProps = {
  data: Question[];
  countryOrSlug?: string;
  country?: Country;
  isLoading?: boolean;
  skeletonCount?: number;
  pages?: unknown;
};

export const QuestionsList = ({
  data,
  countryOrSlug,
  country,
  isLoading = false,
  skeletonCount = 3,
  pages,
}: QuestionsListProps) => {
  return (
    <div className="_question-list space-y-3">
      <QuestionsTools />

      <QuestionCard data={data ?? []} />
    </div>
  );
};
