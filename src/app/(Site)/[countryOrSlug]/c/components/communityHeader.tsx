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

  const [topFix, setTopFix] = useState(18);
  const [fix, setfix] = useState(false);
  const [fixM, setfixM] = useState(false);

  const handleScroll = () => {
    let currentScrollY = window.scrollY;
    if (currentScrollY > 165) {
      setfix(true);
    }
    if (currentScrollY <= 165) {
      setfix(false);
    }
    if (currentScrollY > 70) {
      setfixM(true);
    }
    if (currentScrollY <= 70) {
      setfixM(false);
    }
    if (currentScrollY <= 1) {
      setTopFix(18);
    } else {
      setTopFix(0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fix, fixM]);

  return (
    <div className="_community-header">
      <div className="container">
        <div className="rounded-xl border bg-sky-50 p-3">
          <h1 className="text-center font-semibold">
            موضوعات مطرح شده در {country?.name}
          </h1>
          <span className="hidden font-medium text-gray-500 sm:inline">
            ({question?.meta.totalItems} آیتم)
          </span>
        </div>

        {/* <CommunityBreadcrumb
        country={{ name: country.name, code: country.code }}
      /> */}
      </div>
    </div>
  );
}
