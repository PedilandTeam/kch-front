import Image from "next/image";

const PageHead = () => {
  return (
    <div className="page-head h-[340px] flex justify-center content-center mx-3 sm:mx-auto sm:max-w-[95%] relative">
      <Image
        className="rounded-xl brightness-[.50] object-cover h-[340px]"
        src={`/images/slide/contact-header-01.jpg`}
        width={1700}
        height={340}
        alt=""
      />
      <div className="max-w-[1144px] w-full mx-auto absolute top-0 left-0 right-0 h-full flex flex-wrap justify-center items-center">
        <div className="wrap text-white text-center">
          <h1 className=" font-bold text-[40px] mb-3">تماس با کـوچـا</h1>
          <h2 className="font-normal text-[22px]">مشتاق شنیدن تـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};

export default PageHead;
