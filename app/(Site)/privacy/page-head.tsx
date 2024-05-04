import Image from "next/image";
import phImage from "@/public/images/phead/ph-privacy-02.webp";
import phImageMobile from "@/public/images/phead/ph-privacy-02-m.webp";

const PageHead = () => {
  return (
    <div className="page-head">
      <Image
        className="rounded-xl brightness-[.60] object-cover h-[300px] hidden sm:block"
        src={phImage}
        placeholder="blur"
        width={1700}
        height={300}
        alt="colorful abstract texture"
        priority
      />
      <Image
        className="rounded-xl brightness-[.60] object-cover sm:hidden"
        src={phImageMobile}
        placeholder="blur"
        width={430}
        height={430}
        alt="colorful abstract texture"
        priority
      />
      <div className="content">
        <div className="wrap text-white">
          <h1>حریم خصوصی کاربران</h1>
          <h2>مراقب امنیت تـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
