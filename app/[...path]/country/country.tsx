import { CountryStats } from "./countryStats";
import { ModCategories } from "./modcategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import { UnitsBanner } from "./unitsBanner";



type CountryProps = {
  currentCountry: CountryNamespace.GET
  categories: CategoryNamespace.GET
}
export default function Country({currentCountry, categories}: CountryProps) {
  return (
    <div className="component page-country">
      <SliderHome currentCountry={currentCountry} />
      <div className="container mx-auto max-w-[1144px]">
        <UnitsBanner currentCountry={currentCountry} />
        {/** @ts-expect-error Server Component */}
        <CountryStats currentCountry={currentCountry} />
        {/* <ModCategories categories={categories} /> */}
      </div>
    </div>
  );
}
