import { Mod4Stats } from "./modstats4";
import { Mod4Units } from "./modunits4";
import { ModCategories } from "./modcategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";



type CountryProps = {
  currentCountry: CountryNamespace.GET
  categories: CategoryNamespace.GET
}
export default function Country({currentCountry, categories}: CountryProps) {
  return (
    <div className="component page-country">
      <SliderHome currentCountry={currentCountry} />
      <div className="container mx-auto max-w-[1144px]">
        <Mod4Units currentCountry={currentCountry} />
        <Mod4Stats categories={categories} />
        {/* <ModCategories categories={categories} /> */}
      </div>
    </div>
  );
}
