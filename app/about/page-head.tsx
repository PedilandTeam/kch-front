import Image from "next/image";
import phImage from "../../public/images/phead/ph-about-01.webp";

const PageHead = () => {
  return (
    <div className="page-head">
      <Image
        className="rounded-xl brightness-[.60] object-cover h-[300px]"
        src={phImage}
        // placeholder="blur"
        width={1700}
        height={300}
        alt=""
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
