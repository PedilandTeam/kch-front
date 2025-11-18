import { API_ROUTES } from "@/routes";
import type { Country } from "@/schemas/country";
import { COUNTRY } from "@/text/location";
import type { StatsNamespace } from "@/types/stats";
import Image from "next/image";
import Link from "next/link";

import atImage from "@/assets/images/bd/hp-austria.webp";
import caImage from "@/assets/images/bd/hp-canada.webp";
import dkImage from "@/assets/images/bd/hp-denmark.webp";
import ukImage from "@/assets/images/bd/hp-england.webp";
import frImage from "@/assets/images/bd/hp-france.webp";
import deImage from "@/assets/images/bd/hp-germany.webp";
import nlImage from "@/assets/images/bd/hp-netherland.webp";
import seImage from "@/assets/images/bd/hp-sweden.webp";
import trImage from "@/assets/images/bd/hp-turkey.webp";
import { e2p } from "@/utils/e2p";

type CountryWithStats = Country & { pageCount: number };

// ----------------------
// SAFE FETCH VERSION
// ----------------------
async function safeJsonFetch(req: Promise<Response>): Promise<any | null> {
  try {
    const res = await req;

    if (!res.ok) {
      console.error("API not OK:", res.status, res.statusText);
      return null;
    }

    const contentType = res.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      console.error("NON-JSON response detected:", contentType);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Network/API error:", err);
    return null;
  }
}

// ----------------------
// FETCH COUNTRIES + STATS — SAFE
// ----------------------
async function fetchCountriesWithStats(): Promise<CountryWithStats[] | null> {
  const countries: Country[] | null = await safeJsonFetch(
    API_ROUTES.COUNTRIES.GET_ALL(1, 50),
  );

  if (!countries) return null;

  const countriesWithStats = await Promise.all(
    countries.map(async (country) => {
      const stats: StatsNamespace.COUNTRY_STATS | null = await safeJsonFetch(
        API_ROUTES.STATS.COUNTRY_STATS(country.code, 100),
      );

      return {
        ...country,
        pageCount: stats?.page ?? 0,
      };
    }),
  );

  return countriesWithStats;
}

// --------------------------------
// FEATURED COUNTRIES LIST
// --------------------------------
const FEATURED_COUNTRIES = [
  {
    code: "uk",
    name: COUNTRY.ENGLAND,
    image: ukImage,
    alt: "انگلستان",
    href: "/uk",
  },
  {
    code: "de",
    name: COUNTRY.GERMANY,
    image: deImage,
    alt: "آلمان",
    href: "/de",
  },
  {
    code: "ca",
    name: COUNTRY.CANADA,
    image: caImage,
    alt: "کانادا",
    href: "/ca",
  },
  {
    code: "at",
    name: COUNTRY.AUSTRIA,
    image: atImage,
    alt: "اتریش",
    href: "/at",
  },
  {
    code: "fr",
    name: COUNTRY.FRANCE,
    image: frImage,
    alt: "فرانسه",
    href: "/fr",
  },
  {
    code: "se",
    name: COUNTRY.SWEDEN,
    image: seImage,
    alt: "سوئد",
    href: "/se",
  },
  {
    code: "dk",
    name: COUNTRY.DENMARK,
    image: dkImage,
    alt: "دانمارک",
    href: "/dk",
  },
  {
    code: "tr",
    name: COUNTRY.TURKEY,
    image: trImage,
    alt: "ترکیه",
    href: "/tr",
  },
  {
    code: "nl",
    name: COUNTRY.NETHERLAND,
    image: nlImage,
    alt: "هلند",
    href: "/nl",
  },
];

// ----------------------
// MAIN COMPONENT — SAFE
// ----------------------
export const HomeCountries = async () => {
  const countries = await fetchCountriesWithStats();

  // ❗ اگر API down بود → نمایش متن دوستانه
  if (!countries) {
    return (
      <div className="py-8 text-center text-red-500">
        سرویس‌های Koochaa موقتاً در دسترس نیستند.
      </div>
    );
  }

  // امن‌سازی خواندن pageCount
  const getCount = (code: string) =>
    countries.find((country) => country.code === code)?.pageCount ?? 0;

  const sortedFeaturedCountries = FEATURED_COUNTRIES.map((country) => ({
    ...country,
    count: getCount(country.code),
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="_home-countries space-y-4">
      <h2 className="text-primary text-center font-semibold">
        کشور محل اقامت خودتون رو انتخاب کنید:
      </h2>

      <div className="wrap grid grid-cols-1 gap-3">
        {sortedFeaturedCountries.map((country, index) => (
          <div
            key={country.code}
            className="group relative h-[200px] overflow-hidden rounded-xl"
          >
            <Link href={country.href} className="relative block h-full w-full">
              <Image
                src={country.image}
                placeholder="blur"
                fill
                alt={country.alt}
                className="h-auto cursor-pointer object-cover transition-all duration-500 group-hover:scale-110"
                priority={index < 3}
              />

              <div className="info absolute bottom-0 w-full cursor-pointer bg-linear-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                <h3 className="text-center text-[20px] font-semibold">
                  {country.name}
                  <span className="mr-1 font-normal">
                    ({e2p(country.count)})
                  </span>
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <p className="text-muted-foreground text-center text-sm">
        جهت مشاهده لیست تمام کشورها از منو استفاده کنید.
      </p>
    </div>
  );
};
