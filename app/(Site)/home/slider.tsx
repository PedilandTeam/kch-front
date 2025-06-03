import Image from "next/image";
import Link from "next/link";
import sliderImage from "@/public/images/slide/home/hs-02.webp";
import sliderImageMobile from "@/public/images/slide/home/hsm-01.webp";

export const SliderMainHome = () => {
  return (
    <div className="_slider-home h-[520px] flex justify-center content-center sm:mx-auto relative rounded-xl">
      <Image
        className="rounded-xl brightness-[.50] object-cover hidden sm:block"
        src={sliderImage}
        placeholder="blur"
        width={1700}
        height={520}
        alt="a Woman working with a laptop"
        priority
      />
      <Image
        className="rounded-xl brightness-[.75] object-cover sm:hidden"
        src={sliderImageMobile}
        placeholder="blur"
        width={430}
        height={600}
        alt="a Woman is holding a globe"
        priority
      />
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[12%] sm:bottom-[20%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 font-medium bg-blue-900 bg-opacity-60 inline-flex flex-wrap text-[20px] sm:text-[24px] px-2">
            هـر کـجـای جـهـان کـه زنـدگی مـی‌کـنـیـد،
          </h3>
          <h2 className="text-white pr-3 sm:pr-0 font-bold text-[28px] sm:text-[34px] leading-[48px] sm:leading-[54px] max-w-[310px] sm:max-w-[600px] mt-2 mb-5 drop-shadow">
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
