"use client";

import { HomeCountries } from "./home/countries";
import { SliderMainHome } from "./home/slider";

export default function Page() {
  return (
    <div className="component page-home sm:mx-auto w-full sm:max-w-[95%]">
      <SliderMainHome />
      <HomeCountries />
    </div>
  );
}
