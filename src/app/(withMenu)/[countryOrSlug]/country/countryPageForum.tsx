// src/app/(Site)/[countryOrSlug]/country/countryPageForum.tsx

import { Button } from "@/components/ui/button";
import { API_ROUTES, UNITS_LIST_ARRAY } from "@/routes";
import { Category, MostUsedCategories } from "@/types/category";
import { Country } from "@/types/country";
import Link from "next/link";

type SliderHomeProps = {
  currentCountry: Country;
};

async function getMostUsedCategories(countryCode: string) {
  let result: MostUsedCategories;

  try {
    result = await (
      await API_ROUTES.CATEGOREIS.MOST_USED(countryCode, 2, 120)
    ).json();
    return result;
  } catch (err) {
    console.error("Error in getMostUsedCategories", err);
    throw new Error("error in getMostUsedCategories");
  }
}

export const CountryPageForum = async ({ currentCountry }: SliderHomeProps) => {
  const mostUsedCategories: MostUsedCategories = await getMostUsedCategories(
    currentCountry.code,
  );
  const units = UNITS_LIST_ARRAY;

  return (
    <div className="_country-forum">
      <div className="_wrap">
        <h2>هم‌رسانی تجربه</h2>
        <h3>یه راه حل واقعی برای پیدا کردن پاسخ سوالات شما</h3>
        <p className="my-3 text-sm">
          همرسانی تجربه یک ابزار ساده و کارآمد است که به شما کمک می‌کند بدون
          اتلاف وقت و سردرگمی در گروه‌های شلوغ تلگرامی، پاسخ دقیق و معتبر سوالات
          خود را پیدا کنید. چه در ابتدای مسیر مهاجرت باشید و چه در حال زندگی در
          کانادا، می‌توانید به راحتی با متخصصان و هموطنان با تجربه ارتباط بگیرید
          و از تجربیات واقعی آن‌ها استفاده کنید.
        </p>
        <Link href={`/${currentCountry.code}/c`} scroll>
          <Button>از اینجا شروع کن</Button>
        </Link>
      </div>
    </div>
  );
};
