"use client";

import Image from "next/image";
import Link from "next/link";

export const LogoTop = () => {
  return (
    <div className="logo">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          width={217}
          height={60}
          priority={true}
          alt="Pediland Logo"
        />
      </Link>
    </div>
  );
};
