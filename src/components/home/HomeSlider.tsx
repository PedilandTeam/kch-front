import Image from "next/image";
import sliderImage from "@/assets/images/bd/hsm-01.webp";

export const HomeSlider = () => {
  return (
    <div className="slider relative flex h-[460px] content-center justify-center rounded-xl">
      <Image
        className="rounded-xl object-cover brightness-[.75]"
        src={sliderImage}
        placeholder="blur"
        width={390}
        height={545}
        alt="a Woman is holding a globe"
        priority
      />
      <div className="absolute flex h-full w-full items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <h3 className="bg-primary/70 flex h-10 items-center justify-center rounded-md px-3 text-lg font-medium text-white/90">
            هـرجـای جـهـان کـه زنـدگی مـی‌کـنـیـد
          </h3>
          <h2 className="text-center text-2xl leading-relaxed font-medium text-white drop-shadow-sm drop-shadow-black/50">
            به سادگی با جامعه <br />
            ایرانیان مهاجر اطراف‌تون <br />
            در ارتباط باشید
          </h2>
        </div>
      </div>
    </div>
  );
};
