import Image from "next/image";

const PageHead = () => {
  return (
    <div className="page-head h-[300px] bg-[#e8dabd]">
      <div className="container mx-auto max-w-[1144px] flex justify-between items-center">
        <div className="wrap text-amber-800">
          <h1 className=" font-bold text-[36px] mb-3">درباره کـوچـا</h1>
          <h2 className="font-normal text-[22px]">خواهان لبخندتـون هستیم!</h2>
        </div>
        <Image
          className="h-[300px]"
          src={`/images/phead/ph-about-01.png`}
          width={760}
          height={300}
          alt="a boy is laughing"
        />
      </div>
    </div>
  );
};

export default PageHead;
