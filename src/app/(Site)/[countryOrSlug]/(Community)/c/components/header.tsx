// app/components/community/header.tsx
"use client";

import { useQuestions } from "@/app/(Site)/[countryOrSlug]/(Community)/c/apiForum/useGetQuestions";
import { CommunityBreadcrumb } from "@/app/(Site)/[countryOrSlug]/(Community)/c/components/breadcrumb";
import { CountryNamespace } from "@/types/country";
import { useEffect, useState } from "react";

export default function CommunityHeader({
  country,
  countryOrSlug,
}: {
  countryOrSlug: string;
  country: CountryNamespace.GET;
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
    <div className="_community-header px-3 pt-4 pb-3">
      <div className="_title">
        <h1 className="text-xl font-bold sm:text-2xl">
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
  );
}
