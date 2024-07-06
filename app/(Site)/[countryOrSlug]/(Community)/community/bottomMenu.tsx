"use client";
import { Flag, HouseLine, List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function BottomMenu() {
  return (
    <div className="fixed z-50 w-full md:hidden bottom-2">
      <div className="flex items-center justify-between px-4 py-2 mx-2 bg-white border border-gray-300 rounded-full wraper">
        <div className="flex flex-col items-center justify-center">
          <Flag size={30} color="#282828" />
          <span className="inline-flex justify-center text-sm">
            انتخاب کشور
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mb-1 avatar">
            <Image
              src="/images/user-avatar.jpg"
              className="border-2 rounded-full"
              width={24}
              height={24}
              alt="User Avatar"
            />
          </div>
          <span className="inline-flex justify-center text-sm">
            حساب کاربری
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <List size={30} color="#282828" />
          <span className="inline-flex justify-center text-sm">منو</span>
        </div>

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
    </div>
  );
}
