import Image from "next/image";

const PageHead = () => {
  return (
    <div className="page-head h-[300px] flex justify-center content-center mx-3 sm:mx-auto sm:max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.70] object-cover h-[300px]"
        src={`/images/phead/ph-about-01.webp`}
        width={1700}
        height={300}
        alt=""
      />
      <div className="max-w-[1144px] w-full mx-auto absolute top-0 left-0 right-0 h-full flex flex-wrap items-center">
        <div className="wrap text-white">
          <h1 className=" font-bold text-[40px] mb-3">درباره کـوچـا</h1>
          <h2 className="font-normal text-[22px]">خواهان لبخندتـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
