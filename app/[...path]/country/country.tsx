import { Mod4Stats } from "./modstats4";
import { Mod4Units } from "./modunits4";
import { ModCategories } from "./modcategories";
import { SliderHome } from "./slider";

export default function Country() {
  return (
    <div className="component page-country">
      <SliderHome />
      <div className="container mx-auto max-w-[1144px]">
        <Mod4Units />
        <Mod4Stats />
        <ModCategories />
      </div>
    </div>
  );
}
