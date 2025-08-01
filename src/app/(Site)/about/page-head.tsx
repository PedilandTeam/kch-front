import Image from "next/image";
import phImage from "@/assets/images/phead/ph-about-01.webp";
import phImageMobile from "@/assets/images/phead/ph-about-01-m.webp";

const PageHead = () => {
  return (
    <div className="page-head">
      <Image
        className="hidden h-[300px] rounded-xl object-cover brightness-[.60] sm:block"
        src={phImage}
        placeholder="blur"
        width={1700}
        height={300}
        alt="a boy is laughing"
        priority
      />
      <Image
        className="rounded-xl object-cover brightness-[.60] sm:hidden"
        src={phImageMobile}
        placeholder="blur"
        width={430}
        height={430}
        alt="a boy is laughing"
        priority
      />
      <div className="content">
        <div className="wrap text-white">
          <h1>درباره کـوچـا</h1>
          <h2>خواهان لبخندتـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
