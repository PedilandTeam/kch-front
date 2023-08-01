"use client"

import Image from "next/image";
import Link from "next/link";

export const LogoTop = () => {
  return (
    <div className="logo">
      <Link  href="/">
        <Image
          src="/img/logo.svg"
          width={180}
          height={56}
          alt="Pediland Logo"
        />
      </Link>
    </div>
  );
};
