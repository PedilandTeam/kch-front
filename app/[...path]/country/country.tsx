import { Mod01 } from "./mod01";
import { Mod02 } from "./mod02";
import { SliderHome } from "./slider";

export default function Country() {
  return (
    <div className="component page-country">
      {/* <SliderHome /> */}
      <div className="container mx-auto max-w-[1144px]">
        <Mod02 />
        <Mod01 />
      </div>
    </div>
  );
}
