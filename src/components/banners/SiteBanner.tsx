import Image from "next/image";

export const SiteBanner = () => {
  return (
    <div className="_site-banner">
      <Image
        src={"/images/banner/cmnt-img-01.jpg"}
        alt="Banner"
        className="rounded-lg"
        width={400}
        height={400}
        priority
      />
    </div>
  );
};
