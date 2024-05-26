import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type StaticAdvertise = {
  imageUrlOrPath: string;
  link: string;
  alt?: string;
  lgDisable?: boolean;
};
const StaticAdvertise: FC<StaticAdvertise> = ({
  imageUrlOrPath,
  link,
  alt = "banner",
  lgDisable = false,
}) => {
  return (
    <Link className={lgDisable ? 'lg:hidden' : ''} href={link} target="_blank">
      <Image
        src={imageUrlOrPath}
        width={562}
        height={144}
        quality={100}
        className="rounded-lg"
        alt={alt}
      />
    </Link>
  );
};

export default StaticAdvertise;
