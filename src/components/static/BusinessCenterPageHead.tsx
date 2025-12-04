import Image from "next/image";

import phImage from "@/assets/images/ph-business-center.webp";

export const BusinessCenterPageHead = () => {
  return (
    <div className="_business-center-page-head relative">
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
        <div className="wrap space-y-1 text-center text-white">
          <h1 className="text-3xl font-medium" dir="ltr">
            بیزینس سنتر
          </h1>
          <h2 className="text-xl font-medium">راهـکـار جـامـع کـسـب و کـار</h2>
        </div>
      </div>
    </div>
  );
};
