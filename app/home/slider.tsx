import { CursorArrowRippleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const SliderMainHome = () => {
  return (
    <div className="slider h-[520px] flex justify-center content-center mx-3 sm:mx-auto sm:max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.50] object-cover"
        src={"/img/slide/home-slider-04-min.jpg"}
        width={1700}
        height={600}
        alt=""
      />
      <div className="max-w-[1144px] sm:m-auto absolute w-auto bottom-[15%] sm:left-0 sm:right-0 sm:w-full">
        <div>
          <h3 className="text-gray-300 bg-pink-700 bg-opacity-60 py-2 px-3 sm:px-2 inline-flex flex-wrap text-[24px] sm:text-[28px] font-medium sm:rounded-md">
            هر کجای جهان که زندگی می‌کنید،
          </h3>
          <h2 className="text-white font-bold text-[28px] sm:text-[36px] mt-3 mx-3 sm:mx-0 drop-shadow">
            به راحتی جامعه فـارسـی زبـان اطراف خود را پیدا کنید!
          </h2>
          <Link target={"_blank"} href={"https://t.me/koochaa_support"}>
            <button className="btn my-3 sm:my-5 px-3 mx-3 sm:mx-0 bg-lime-300 border-lime-300 text-lime-900 hover:bg-lime-400 hover:border-lime-400 hover:text-lime-950">
              از اینجا شروع کنید
              <CursorArrowRippleIcon className="w-7 h-7" />
            </button>
          </Link>
          <h3 className="text-white mx-3 sm:mx-0 text-[15px] sm:text-[17px] tracking-wide mb-3">
            و یا از بالای صفحه کشور مورد نظر خود را انتخاب کنید.
          </h3>
        </div>
      </div>
    </div>
  );
};
