import { CountryStats } from "./countryStats";
import { CountryCategories } from "./countryCategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import { UnitsBanner } from "./unitsBanner";
import { SeoText } from "./seoText";
import Image from "next/image";

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
      {/* <div className="container mx-auto max-w-[1144px]">
        <div className="flex flex-wrap gap-3 px-3 my-10 sm:gap-5 sm:px-0">
          <div>
            <Image
              src={"/images/banner/bnr-04.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
          <div>
            <Image
              src={"/images/banner/bnr-04.gif"}
              width={562}
              height={72}
              alt="banner"
            />
          </div>
        </div>
      </div> */}

      <CountryStats currentCountry={currentCountry} />

      <CountryCategories currentCountry={currentCountry} />

      <SeoText currentCountry={currentCountry} />
    </div>
  );
}
