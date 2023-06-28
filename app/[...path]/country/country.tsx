import { Mod01 } from "./mod01";
import { Mod02 } from "./mod02";

export default function Country() {
  return (
    <div className="component page-country">
      <div className="slider h-[300px] bg-slate-100"></div>
      <div className="container mx-auto max-w-[1144px]">
        <Mod02 />
        <Mod01 />
      </div>
    </div>
  );
}
