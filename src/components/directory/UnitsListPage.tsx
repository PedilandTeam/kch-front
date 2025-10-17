import fetchWrapper from "@/api/fetchWrapper";
import type { Country } from "@/schemas";
import type { GetPagesResponse } from "@/types/page";
import type { UnitType } from "@/types/unit";
import {
  ItemCardsList,
  PageImage,
  UnitBreadcrumb,
  UnitSeoText,
} from "@components";

interface UnitsListPageProps {
  unit: UnitType;
  country: Country;
  pageNumber?: number;
  city?: number | number[];
  category?: number | number[];
  search?: string;
}

export async function UnitsListPage({
  unit,
  country,
  pageNumber,
  city,
  category,
  search,
}: UnitsListPageProps) {
  let pages: GetPagesResponse | undefined = undefined;

  const filters = {
    page: pageNumber ? pageNumber : 1,
    limit: 24,
    countryCode: country.code,
    unitId: unit.id, // Use unitId (singular) as expected by /pages API
    ...(city && { cityIds: city }),
    ...(category && { categoryIds: category }),
    ...(search && { search }),
  };

  console.log("🔍 UnitsListPage filters:", filters);
  console.log("🔍 Unit ID:", unit.id, "Type:", typeof unit.id);
  console.log("🔍 Country code:", country.code);

  try {
    pages = await fetchWrapper<GetPagesResponse>("pages", {
      filters,
      tags: ["country", "page"],
      revalidate:
        +process.env.DEFAULT_REVALIDATE_TIME_FOR_PAGE_HANDLERS || 2000,
    });
    
    console.log("✅ UnitsListPage - Pages fetched:", pages?.meta);
    console.log("✅ Total items returned:", pages?.items?.length);
    
    // Check if filtering worked
    if (pages?.items?.length > 0) {
      const firstItem = pages.items[0];
      console.log("🔍 First item unit:", firstItem?.unit);
      const itemsWithCorrectUnit = pages.items.filter(item => item.unit?.id === unit.id);
      console.log("✅ Items with correct unit:", itemsWithCorrectUnit.length, "out of", pages.items.length);
      
      if (itemsWithCorrectUnit.length === 0) {
        console.warn("⚠️ No items match the expected unit! This suggests filtering is not working.");
      }
    } else {
      console.warn("⚠️ No items returned at all!");
    }
  } catch (err: any) {
    console.error("❌ Error in UnitsListPage", err);
  }

  return (
    <PageImage className="_unit-list-page" country={country}>
      <div className="flex flex-col items-center space-y-4 px-3">
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

      <ItemCardsList
        pages={pages}
        country={country}
      />

      <UnitSeoText currentCountry={country} unit={unit} />
    </PageImage>
  );
}
