// app/components/community/header.tsx
"use client";

import { useQuestions } from "@/app/(Site)/[countryOrSlug]/c/apiForum/useGetQuestions";
import { CommunityBreadcrumb } from "@/app/(Site)/[countryOrSlug]/c/components/breadcrumb";
import { Country } from "@/types/country";
import { useEffect, useState } from "react";

export default function CommunityHeader({
  country,
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: Country;
}) {
  const { question } = useQuestions(countryOrSlug, 1);

  return (
    <div className="_community-header">
      <div className="container">
        <div className="flex items-center justify-center gap-3 rounded-xl border bg-sky-50 p-3">
          <h1 className="font-semibold">همرسانی تجربه در {country?.name}</h1>
          <span className="hidden font-medium text-gray-500 sm:inline">
            ({question?.meta.totalItems} مورد)
          </span>
        </div>
      </div>
    </div>
  );
}
