// app/(Site)/layout/footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

// UI Import
import { FOOTER } from "@/text/footer";
import { GENERAL } from "@/text/general";
import { MENU } from "@/text/menu";
import {
  CaretCircleUpDownIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";

export const Footer = () => {
  return (
    <footer className="mt-6 rounded-tl-3xl rounded-tr-3xl bg-[#1c39bb] py-6 text-gray-50">
      <div className="_footer container mx-auto max-w-6xl px-3">
        <div className="grid grid-cols-1 gap-10">
          <div className="px-2">
            <Image
              className="mb-3 h-auto w-[160px]"
              src={"/images/logo-white.svg"}
              width={300}
              height={83}
              alt="Koochaa Logo in white color"
            />
            <p className="text-justify font-extralight">{FOOTER.SEO_TEXT}</p>
          </div>

          <div className="flex items-center">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-center">
              <Link href={"/about"} className="link-hover link">
                {MENU.ABOUT}
              </Link>
              <Link href={"http://biz.koochaa.com"} className="link-hover link">
                {MENU.BIZ}
              </Link>
              <Link href={"/jobs"} className="link-hover link">
                {MENU.JOBS}
              </Link>
              <Link href={"/terms"} className="link-hover link">
                {MENU.TERMS_AND_CONDITIONS}
              </Link>
              <Link href={"/contact"} className="link-hover link">
                {MENU.CONTACT_US}
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="_socials w-full space-y-2 text-center">
              <div>{FOOTER.FOLLOW_US}</div>
              <div className="flex w-full justify-center gap-7">
                <Link
                  href={"https://www.instagram.com/_koochaa"}
                  target="_blank"
                >
                  <InstagramLogoIcon
                    size={30}
                    weight="light"
                    className="hover:text-secondary transition duration-300"
                  />
                </Link>

                <Link
                  href={"https://www.linkedin.com/company/koochaa"}
                  target="_blank"
                >
                  <LinkedinLogoIcon
                    size={30}
                    weight="light"
                    className="hover:text-secondary transition duration-300"
                  />
                </Link>

                <Link
                  href={"https://www.facebook.com/koochaa.fb"}
                  target="_blank"
                >
                  <FacebookLogoIcon
                    size={30}
                    weight="light"
                    className="hover:text-secondary transition duration-300"
                  />
                </Link>

                <Link href={"https://twitter.com/_koochaa"} target="_blank">
                  <XLogoIcon
                    size={30}
                    weight="light"
                    className="hover:text-secondary transition duration-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="_copyright mt-8 text-center">
          <p className="text-sm font-light">
            {FOOTER.COPYRIGHT_TEXT1}
            <Link href="/" className="link-hover link mx-1 inline-flex">
              {GENERAL.KOOCHAA}
            </Link>
            {FOOTER.COPYRIGHT_TEXT2}
          </p>
        </div>
      </div>

      <Link
        href={"#top"}
        scroll
        className="fixed -right-10 bottom-[10px] hidden"
        id="toTopDiv"
      >
        <CaretCircleUpDownIcon
          size={32}
          weight="light"
          className="text-blue-100 duration-300 hover:text-blue-400"
        />
      </Link>
    </footer>
  );
};
