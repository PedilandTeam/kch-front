import Image from "next/image";

import phImage from "@/assets/images/ph-contact.webp";

export const ContactPageHead = () => {
  return (
    <div className="_about-page-head relative">
      <Image
        className="aspect-3/2 rounded-xl object-cover brightness-[.60]"
        src={phImage}
        placeholder="blur"
        width={390}
        height={390}
        alt="a boy is laughing"
        priority
      />
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="wrap space-y-2 text-center text-white">
          <h1 className="text-3xl font-bold">تماس با ما</h1>
          <h2 className="text-xl font-medium">مشتاق شنیدن تـون هستیم!</h2>
        </div>
      </div>
    </div>
  );
};
