"use client";

import type { Country } from "@/schemas";
import type { UnitType } from "@/types/unit";
import { WrapPageImage } from "../layout/WrapPageImage";
import { WrapContainer } from "../layout/WrapContainer";
import { UnitBreadcrumb } from "./UnitBreadcrumb";
import { ItemCardsList } from "./item";
import { UnitSeoText } from "./UnitSeoText";
import { AdsClubBanner } from "../banners/AdsClubBanner";
import { usePagesList } from "@/hooks/swr/usePagesList";

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

  console.log("pages in component:", country);

  return (
    <WrapPageImage className="_unit-list-page h-full" country={country}>
      <WrapContainer>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-lg font-semibold text-white drop-shadow-sm drop-shadow-black/70">
              لیست {unit?.name} فارسی زبان در {country?.name}
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

      <UnitSeoText currentCountry={country} unit={unit} />
    </WrapPageImage>
  );
}
