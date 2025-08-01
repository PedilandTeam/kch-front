import Image from "next/image";
import Link from "next/link";
import sliderImage from "@/assets/images/slide/home/hs-02.webp";
import sliderImageMobile from "@/assets/images/slide/home/hsm-01.webp";

export const SliderMainHome = () => {
  return (
    <div className="slider relative mx-3 flex h-[520px] content-center justify-center rounded-xl sm:mx-auto">
      <Image
        className="hidden rounded-xl object-cover brightness-[.50] sm:block"
        src={sliderImage}
        placeholder="blur"
        width={1700}
        height={520}
        alt="a Woman working with a laptop"
        priority
      />
      <Image
        className="rounded-xl object-cover brightness-[.75] sm:hidden"
        src={sliderImageMobile}
        placeholder="blur"
        width={430}
        height={600}
        alt="a Woman is holding a globe"
        priority
      />
      <div className="absolute bottom-[12%] w-auto max-w-[1144px] sm:bottom-[20%] sm:left-0 sm:right-0 sm:m-auto sm:w-full">
        <div>
          <h3 className="inline-flex flex-wrap bg-blue-900 bg-opacity-60 px-2 text-[20px] font-medium text-gray-300 sm:text-[24px]">
            هـر کـجـای جـهـان کـه زنـدگی مـی‌کـنـیـد،
          </h3>
          <h2 className="mb-5 mt-2 max-w-[310px] pr-3 text-[28px] font-bold leading-[48px] text-white drop-shadow sm:max-w-[600px] sm:pr-0 sm:text-[34px] sm:leading-[54px]">
            به راحتی مـشـاغـل و پـزشـکـان فـارسـی زبـان اطـراف‌تـون رو پـیـدا
            کـنـیـد!
          </h2>
        </div>
        <Link href={"#select-country"} scroll>
          <button className="btn btn-accent">از اینجا شروع کنید</button>
        </Link>
      </div>
    </div>
  );
};
