import Image from "next/image";
import phImage from "../../public/images/phead/ph-terms-01.webp";
import phImageMobile from "../../public/images/phead/ph-terms-01-m.webp";

const PageHead = () => {
  return (
    <div className="page-head">
      <Image
        className="rounded-xl brightness-[.60] object-cover h-[300px] hidden sm:block"
        src={phImage}
        placeholder="blur"
        width={1700}
        height={300}
        alt="a tennis ball in field"
        priority
      />
      <Image
        className="rounded-xl brightness-[.60] object-cover sm:hidden"
        src={phImageMobile}
        placeholder="blur"
        width={430}
        height={430}
        alt="a tennis ball in field"
        priority
      />
      <div className="content">
        <div className="wrap text-white">
          <h1>قوانین و مقررات</h1>
          <h2>طرفدار حق و حقوق تـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
