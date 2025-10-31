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

type CountryWithStats = Country & { pageCount: number };

async function fetchCountriesWithStats() {
  let countries: Country[];
  try {
    countries = await (await API_ROUTES.COUNTRIES.GET_ALL(1, 50)).json();
  } catch (err) {
    console.error("Error in fetchCountries", err);
    throw new Error("error in get countries");
  }

  // Fetch stats for each country to get page counts
  const countriesWithStats = await Promise.all(
    countries.map(async (country) => {
      try {
        const stats: StatsNamespace.COUNTRY_STATS = await (
          await API_ROUTES.STATS.COUNTRY_STATS(country.code, 100)
        ).json();
        return { ...country, pageCount: stats.page };
      } catch (err) {
        console.error(`Error fetching stats for ${country.code}:`, err);
        return { ...country, pageCount: 0 };
      }
    }),
  );

  return countriesWithStats;
}

// Country configuration for the home page
const FEATURED_COUNTRIES = [
  {
    code: "uk",
    name: COUNTRY.ENGLAND,
    image: ukImage,
    alt: "یک تصویر از کشور انگلستان",
    href: "/uk",
  },
  {
    code: "de",
    name: COUNTRY.GERMANY,
    image: deImage,
    alt: "یک تصویر از کشور آلمان",
    href: "/de",
  },
  {
    code: "ca",
    name: COUNTRY.CANADA,
    image: caImage,
    alt: "یک تصویر از کشور کانادا",
    href: "/ca",
  },
  {
    code: "at",
    name: COUNTRY.AUSTRIA,
    image: atImage,
    alt: "یک تصویر از کشور اتریش",
    href: "/at",
  },
  {
    code: "fr",
    name: COUNTRY.FRANCE,
    image: frImage,
    alt: "یک تصویر از کشور فرانسه",
    href: "/fr",
  },
  {
    code: "se",
    name: COUNTRY.SWEDEN,
    image: seImage,
    alt: "یک تصویر از کشور سوئد",
    href: "/se",
  },
  {
    code: "dk",
    name: COUNTRY.DENMARK,
    image: dkImage,
    alt: "یک تصویر از کشور دانمارک",
    href: "/dk",
  },
  {
    code: "tr",
    name: COUNTRY.TURKEY,
    image: trImage,
    alt: "یک تصویر از کشور ترکیه",
    href: "/tr",
  },
  {
    code: "nl",
    name: COUNTRY.NETHERLAND,
    image: nlImage,
    alt: "یک تصویر از کشور هلند",
    href: "/nl",
  },
];

export const HomeCountries = async () => {
  const countries: CountryWithStats[] = await fetchCountriesWithStats();

  const getCount = (countryCode: string) => {
    return countries.find(
      (country: CountryWithStats) => country.code == countryCode,
    )?.pageCount;
  };

  // Sort featured countries by their page count (highest first)
  const sortedFeaturedCountries = FEATURED_COUNTRIES.map((country) => ({
    ...country,
    count: getCount(country.code) || 0,
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
            className="group relative h-[180px] overflow-hidden rounded-xl"
          >
            <Link href={country.href} className="relative block h-full w-full">
              <Image
                src={country.image}
                placeholder="blur"
                fill
                alt={country.alt}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="cursor-pointer transition-all duration-500 group-hover:scale-110"
                priority={index < 3} // Only prioritize first 3 images
              />
              <div className="info absolute bottom-0 w-full cursor-pointer bg-gradient-to-t from-black px-5 py-8 text-white transition-all duration-500 group-hover:py-10">
                <h3 className="text-center text-[20px] font-semibold">
                  {country.name}
                  <span className="mr-1 font-normal">({country.count})</span>
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
