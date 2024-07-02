"use client";
import { User } from "@nextui-org/react";
import { Flag, HouseLine, List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BottomMenu() {
  return (
    <div className="md:hidden fixed z-50 bottom-0 h-[5rem] w-full gap-[3rem] bg-white flex justify-center items-center py-2 border-t-2 border-gray-300">
      <List size={38} color="#282828" />

      <Flag size={38} color="#282828" />
      <User
        avatarProps={{
          size: "md",
          src: "",
        }}
      />
      <Link href="/">
        <Image
          src="/images/logo-01.png"
          width={40}
          height={40}
          priority={true}
          alt="Koochaa Logo"
        />
      </Link>
    </div>
  );
}
