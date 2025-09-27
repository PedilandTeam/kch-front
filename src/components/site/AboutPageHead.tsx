import Image from "next/image";
import phImageMobile from "@/assets/images/phead/ph-about-01-m.webp";

export const AboutPageHead = () => {
  return (
    <div className="_about-page-head relative">
      <Image
        className="rounded-xl object-cover brightness-[.60]"
        src={phImageMobile}
        placeholder="blur"
        width={430}
        height={430}
        alt="a boy is laughing"
        priority
      />
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="wrap space-y-2 text-center text-white">
          <h1 className="text-3xl font-bold">درباره کـوچـا</h1>
          <h2 className="text-xl font-medium">خواهان لبخندتـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};
