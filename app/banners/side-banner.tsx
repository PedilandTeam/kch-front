import Link from "next/link";

const SideBanner = () => {
  return (
    <div className="side-banners">
      <div className="add-info flex flex-wrap sm:max-h-[262px] bg-blue-900 rounded-xl p-5 pt-4 bg-[url('/images/bg-01.png')] bg-contain bg-right-top bg-no-repeat">
        <p className="text-white text-center w-full font-semibold text-[26px] sm:text-[22px] leading-[42px] sm:leading-[39px] shadow-tlx">
          میدونسـتی
          <br />
          <span className="text-yellow-900">ثـبـت اطلاعـات</span> در
          <br />
          راهنمای مشـاغـل کـوچـا
          <br />
          <span className="text-yellow-900">رایـگـانـه؟؟؟</span>
        </p>
        <div className="text-center mx-auto mt-3">
          <Link
            href={"https://t.me/koochaa_support"}
            target="_blank"
            className="bg-white rounded-full h-[52px] flex justify-center whitespace-pre items-center text-xl text-blue-900 font-medium shadow-blx hover:bg-yellow-700 hover:text-black transition-all duration-300 group px-7"
          >
            کافیه اینجا{" "}
            <span className="text-yellow-900 group-hover:text-black transition-all duration-300">
              کلیـک
            </span>{" "}
            کنی
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBanner;
