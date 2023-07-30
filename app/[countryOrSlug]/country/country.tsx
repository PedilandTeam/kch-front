import { CountryStats } from "./countryStats";
import { CountryCategories } from "./countryCategories";
import { SliderHome } from "./slider";
import { CountryNamespace } from "@/types/country";
import { CategoryNamespace } from "@/types/category";
import { UnitsBanner } from "./unitsBanner";
import { Metadata } from "next";



type CountryProps = {
  currentCountry: CountryNamespace.GET
  categories: CategoryNamespace.GET;
}
export default function Country({currentCountry, categories}: CountryProps) {

  return (
    <div className="component page-country">
      <SliderHome currentCountry={currentCountry} />
      <div className="container mx-auto max-w-[1144px]">
        <UnitsBanner currentCountry={currentCountry} />
        <CountryStats currentCountry={currentCountry} />
        <CountryCategories currentCountry={currentCountry}/>
      </div>
    </div>
  );
}
