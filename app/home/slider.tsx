import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const SliderMainHome = () => {
  return (
    <div className="slider h-[520px] flex justify-center content-center mx-3 sm:mx-auto relative">
      <Image
        className="rounded-xl brightness-[.50] object-cover"
        src={"/images/slide/home-slider-04-min.jpg"}
        width={1700}
        height={520}
        alt="a Woman working with laptop"
      />
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[20%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 font-medium bg-blue-900 bg-opacity-60 inline-flex flex-wrap text-[20px] sm:text-[24px] mx-3 sm:mx-0">
            هر کجای جهان که زندگی می‌کنید،
          </h3>
          <h2 className="text-white font-bold text-[28px] sm:text-[34px] mt-2 mb-4 mx-3 sm:mx-0 drop-shadow">
            به راحتی مشاغل و پزشکان فـارسـی زبـان اطراف خود را پیدا کنید!
          </h2>
          <h1 className="text-gray-300 font-medium bg-pink-700 bg-opacity-60 inline-flex flex-wrap text-[17px] sm:text-[24px] mx-3 sm:mx-0">
            کـوچـا، جامعه ایرانیان مهاجر مقیم همه جاست!
          </h1>
        </div>
        <Link href={"#select-country"} scroll>
          <button className="btn mt-8 px-3 mx-3 sm:mx-0 bg-lime-300 border-lime-300 text-lime-900 hover:bg-lime-400 hover:border-lime-400 hover:text-lime-950">
            از اینجا شروع کنید
            <CursorArrowRippleIcon className="w-7 h-7" />
          </button>
        </Link>
      </div>
    </div>
  );
};
