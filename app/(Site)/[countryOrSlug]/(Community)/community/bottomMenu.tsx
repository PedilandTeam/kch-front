"use client";
import { Flag, HouseLine, List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BottomMenu() {
  return (
    <div className="md:hidden fixed z-50 bottom-0 h-[5rem] w-full gap-[3rem] bg-white flex justify-center items-center py-2 border-t-2 border-gray-300">
      <List size={38} color="#282828" />
      <div className="avatar">
        <div className="ring-gray-300 ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
          <img src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
        </div>
      </div>

      <Flag size={38} color="#282828" />

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
