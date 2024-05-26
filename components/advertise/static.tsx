'use client'

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type StaticAdvertise = {
  imageUrlOrPath: string;
  link: string;
  from: string,
  alt?: string;
  lgDisable?: boolean;
};
const StaticAdvertise: FC<StaticAdvertise> = ({
  imageUrlOrPath,
  link,
  from,
  alt = "banner",
  lgDisable = false,
}) => {


  const onClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/click/us/?customer=us&from=${from}&size=${'lg'}`)
  };

  return (
    <Link
      className={lgDisable ? "lg:hidden" : ""}
      href={link}
      target="_blank"
      onClick={onClick}
    >
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
