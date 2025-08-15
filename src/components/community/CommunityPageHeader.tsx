// src/components/Community/CommunityPageHeader.tsx
"use client";

import { useQuestions } from "@/app/(Site)/[countryOrSlug]/c/apiForum/useGetQuestions";
import { Country } from "@/types/country";

export const CommunityPageHeader = ({
  country,
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: Country;
}) => {
  const { question } = useQuestions(countryOrSlug, 1);

  return (
    <div className="_community-header">
      <div className="container">
        <div className="flex items-center justify-between gap-2 rounded-lg border border-stone-100 bg-stone-50 p-3">
          <h1 className="font-semibold">همرسانی تجربه در {country?.name}</h1>
          <span className="text-[15px] text-gray-500">
            ({question?.meta.totalItems} مورد)
          </span>
        </div>
      </div>
    </div>
  );
};
