"use client";

import useSWR from "swr";
import axios from "axios";
import type { Country } from "@/schemas";
import type { UnitType } from "@/types/unit";
import type { GetPagesResponse } from "@/types/page";
import { WrapPageImage } from "../layout/WrapPageImage";
import { WrapContainer } from "../layout/WrapContainer";
import { UnitBreadcrumb } from "./UnitBreadcrumb";
import { ItemCardsList } from "./item";
import { UnitSeoText } from "./UnitSeoText";
import { fetcher } from "@/hooks/swr/fetcher";

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
  // Create the API URL with filters
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const filters = new URLSearchParams({
    page: String(pageNumber || 1),
    limit: "24",
    countryCode: country.code,
    unitId: String(unit.id),
    ...(city && {
      cityIds: Array.isArray(city) ? city.join(",") : String(city),
    }),
    ...(category && {
      categoryIds: Array.isArray(category)
        ? category.join(",")
        : String(category),
    }),
    ...(search && { search }),
  });

  const {
    data: pages,
    isLoading: loading,
    error,
  } = useSWR<GetPagesResponse>(
    `${apiUrl}/pages?${filters.toString()}`,
    fetcher,
  );

  return (
    <WrapPageImage className="_unit-list-page h-full" country={country}>
      <WrapContainer>
        <div className="mb-6 flex flex-col items-center space-y-4">
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

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center py-8">
            <div className="text-white">در حال بارگذاری...</div>
          </div>
        ) : (
          <ItemCardsList pages={pages} country={country} />
        )}

        <UnitSeoText currentCountry={country} unit={unit} />
      </WrapContainer>
    </WrapPageImage>
  );
}
