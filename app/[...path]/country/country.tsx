import { Mod4Stats } from "./mod4Stats";
import { Mod4Units } from "./mod4Units";
import { SliderHome } from "./slider";

export default function Country() {
  return (
    <div className="component page-country">
      <SliderHome />
      <div className="container mx-auto max-w-[1144px]">
        <Mod4Units />
        <Mod4Stats />
      </div>
    </div>
  );
}
