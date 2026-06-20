"use client";
import { usePagesList } from "@/hooks/swr/usePagesList";
import type { Country } from "@/schemas";
import type { UnitType } from "@/types/unit";

import { AdsClubBanner } from "@/components/banners/AdsClubBanner";
import { SurveyBanner } from "@/components/banners/SurveyBanner";
import { TelegramBanner } from "@/components/banners/TelegramBanner";
import { ItemCardsList } from "@/components/directory/item";
import { UnitBreadcrumb } from "@/components/directory/UnitBreadcrumb";
import { UnitSeoText } from "@/components/directory/UnitSeoText";
import { WrapContainer } from "@/components/layout/WrapContainer";
import { WrapPageImage } from "@/components/layout/WrapPageImage";

interface UnitsListPageProps {
  unit: UnitType;
  country: Country;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string;
}

export function UnitsListPage({
  unit,
  country,
  pageNumber,
  city,
  category,
  search,
}: UnitsListPageProps) {
  const { pages, loading } = usePagesList({
    limit: 30,
    page: 1,
    countryCode: country.code,
    unitId: unit.id,
  });

  return (
    <WrapPageImage className="_unit-list-page h-full" country={country}>
      <WrapContainer>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-lg font-semibold text-white drop-shadow-sm drop-shadow-black/70">
              لیست {unit?.name} ایرانی در {country?.name}
            </h1>
            <span className="hidden font-medium text-gray-500">
              ({pages?.meta.totalItems} آیتم)
            </span>
          </div>
          <UnitBreadcrumb
            unit={{ name: unit.name, slug: unit.slug }}
            country={{ name: country.name, code: country.code }}
          />
        </div>
      </WrapContainer>

      {loading ? (
        <div className="flex min-h-[420px] items-center justify-center py-8">
          <div className="text-white">در حال بارگذاری...</div>
        </div>
      ) : (
        <ItemCardsList pages={pages} country={country} />
      )}

      <AdsClubBanner />

      <SurveyBanner />

      <TelegramBanner />

      <UnitSeoText currentCountry={country} unit={unit} />
    </WrapPageImage>
  );
}
