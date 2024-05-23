import { CountryStats } from "./countryStats";
import { CountryCategories } from "./countryCategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import { UnitsBanner } from "./unitsBanner";
import { SeoText } from "./seoText";
import Image from "next/image";
import Link from "next/link";

type CountryProps = {
  currentCountry: CountryNamespace.GET;
  categories: CategoryNamespace.GET;
};
export default function Country({ currentCountry, categories }: CountryProps) {
  return (
    <div className="component _country-page">
      <SliderHome currentCountry={currentCountry} />
      <UnitsBanner currentCountry={currentCountry} />

      {/* Advertising Section P05 */}
      <div className="container mx-auto max-w-[1144px]">
        <div className="flex flex-wrap gap-3 px-3 my-10 sm:gap-5 sm:px-0">
          <div>
            <Link href={"https://biz.koochaa.com/"} target="_blank">
              <Image
                src={"/images/banner/ads-002-S1_V1.jpg"}
                width={562}
                height={144}
                quality={100}
                className="rounded-lg"
                alt="banner"
              />
            </Link>
          </div>
          <div>
            <Link href={"https://tally.so/r/3XDljz"} target="_blank">
              <Image
                src={"/images/banner/ads-001-S1_V6.jpg"}
                width={562}
                height={144}
                quality={100}
                className="rounded-lg"
                alt="banner"
              />
            </Link>
          </div>
        </div>
      </div>

      <CountryStats currentCountry={currentCountry} />

      <CountryCategories currentCountry={currentCountry} />

      <SeoText currentCountry={currentCountry} />
    </div>
  );
}
