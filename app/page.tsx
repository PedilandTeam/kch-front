import { Metadata } from "next";
import { HomeCountries } from "./home/countries";
import { SliderMainHome } from "./home/slider";

export const metadata: Metadata = {
  title: "کوچا | جامعه ایرانیان مهاجر مقیم همه جا",
  description: "به جامعه مجازی ایرانیان مهاجر مقیم همه جا خوش آمدید. هر جای دنیا که زندگی می کنید، کوچا همراه شماست تا بتوانید نیازهای خود را به زبان مادری تامین کنید. از جستجوی کسب و کارهای محلی گرفته تا یافتن پزشکانی که به زبان فارسی صحبت می کنند. همچنین خدماتی مثل ثبت آگهی نیازمندی، آموزش، اطلاع از رویدادهای ایرانی، کاریابی و خرید آنلاین محصولات ایرانی بخشی از راهکارهایی است که برای شما در نظر داریم."
};
export default function Page() {
  return (
    <div className="component page-home sm:mx-auto w-full sm:max-w-[95%]">
      <SliderMainHome />
      <HomeCountries />
    </div>
  );
}
