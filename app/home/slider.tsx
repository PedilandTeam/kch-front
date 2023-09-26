import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const SliderMainHome = () => {
  return (
    <div className="slider h-[520px] flex justify-center content-center mx-3 sm:mx-auto relative rounded-xl">
      <Image
        className="rounded-xl brightness-[.50] object-cover hidden sm:block"
        src={"/images/slide/home/hs-01.webp"}
        width={1700}
        height={520}
        alt="a Woman working with laptop"
      />
      <Image
        className="rounded-xl brightness-[.75] object-cover sm:hidden"
        src={"/images/slide/home/hsm-01.webp"}
        width={430}
        height={600}
        alt="a Woman working with laptop"
      />
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[12%] sm:bottom-[20%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 font-medium bg-blue-900 bg-opacity-60 inline-flex flex-wrap text-[20px] sm:text-[24px] px-2">
            هر کجای جهان که زندگی می‌کنید،
          </h3>
          <h2 className="text-white font-bold text-[28px] sm:text-[34px] leading-[48px] sm:leading-[52px] max-w-[280px] sm:max-w-[540px] mt-2 mb-5 drop-shadow">
            به راحتی مشاغل و پزشکان فـارسـی زبـان اطراف خود را پیدا کنید!
          </h2>
        </div>
        <Link href={"#select-country"} scroll>
          <button className="btn px-3 bg-lime-300 border-lime-300 text-lime-900 hover:bg-lime-400 hover:border-lime-400 hover:text-lime-950">
            از اینجا شروع کنید
            <CursorArrowRippleIcon className="w-7 h-7" />
          </button>
        </Link>
      </div>
    </div>
  );
};
