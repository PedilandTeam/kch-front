"use client";
import Link from "next/link";
import { useEffect } from "react";
import {
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
  YoutubeLogo,
  XLogo,
  CaretUp,
} from "app/client-packages/phosphor-icons/react";
import { MENU } from "./text/menu";
import { FOOTER } from "./text/footer";
import { GENERAL } from "./text/general";
import Image from "next/image";

export const Footer = () => {
  useEffect(() => {
    if (typeof window == "undefined") return;
    var toTopDiv = document.getElementById("toTopDiv");
    if (!toTopDiv) return;
    window.addEventListener("scroll", function () {
      var toTopDiv = document.getElementById("toTopDiv");
      if (window.scrollY > 600) {
        // Change the value as needed
        toTopDiv!.classList.remove("hidden");
      } else {
        toTopDiv!.classList.add("hidden");
      }
    });
  }, []);

  return (
    <footer className="pt-10 sm:pt-16 pb-6 sm:pb-5 mt-10 sm:mt-16 bg-[#1c39bb] text-gray-50 rounded-tl-3xl rounded-tr-3xl sm:rounded-none">
      <div className=" container max-w-[1144px] px-3 sm:px-0 mx-auto _footer text-[15px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4">
          <div className="px-4 sm:col-span-2 sm:px-0">
            <Image
              src={"/images/logo-white.svg"}
              width={160}
              height={45}
              className="mb-3"
              alt="Koochaa Logo in white color"
            />
            <p className="font-light text-justify">{FOOTER.SEO_TEXT}</p>
          </div>

          <div className="flex items-center">
            <div className="grid w-full gap-3 text-center sm:grid-flow-row sm:pr-14">
              <Link href={"/about"} className="link link-hover">
                {MENU.ABOUT}
              </Link>
              <Link href={"/jobs"} className="link link-hover">
                {MENU.JOBS}
              </Link>
              <Link href={"/terms"} className="link link-hover">
                {MENU.TERMS_AND_CONDITIONS}
              </Link>
              <Link href={"/contact"} className="link link-hover">
                {MENU.CONTACT_US}
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full text-center">
              <Link
                href={"https://t.me/koochaa_support"}
                target={"_blank"}
                className="font-medium text-white border-white btn btn-outline hover:border-black"
              >
                {FOOTER.CALL_SUPPORT}
              </Link>
              <div className="mt-6 mb-4">{FOOTER.FOLLOW_US}</div>
              <div className="flex justify-center w-full gap-5 sm:justify-around sm:gap-0">
                <Link
                  href={"https://www.instagram.com/_koochaa"}
                  target="_blank"
                >
                  <InstagramLogo
                    size={34}
                    weight="light"
                    className="transition duration-300 hover:text-secondary"
                  />
                </Link>

                <Link
                  href={"https://www.linkedin.com/company/koochaa"}
                  target="_blank"
                >
                  <LinkedinLogo
                    size={34}
                    weight="light"
                    className="transition duration-300 hover:text-secondary"
                  />
                </Link>

                <Link
                  href={"https://www.facebook.com/koochaa.fb"}
                  target="_blank"
                >
                  <FacebookLogo
                    size={34}
                    weight="light"
                    className="transition duration-300 hover:text-secondary"
                  />
                </Link>

                {/* <Link href={"https://www.youtube.com"} target="_blank">
                  <YoutubeLogo
                    size={34}
                    weight="light"
                    className="transition duration-300 hover:text-secondary"
                  />
                </Link> */}

                <Link href={"https://twitter.com/_koochaa"} target="_blank">
                  <XLogo
                    size={34}
                    weight="light"
                    className="transition duration-300 hover:text-secondary"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center sm:mt-20 _copyright">
          <p className="font-light">
            {FOOTER.COPYRIGHT_TEXT1}
            <Link href="/" className="inline-flex mx-1 link link-hover">
              {GENERAL.KOOCHAA}
            </Link>
            {FOOTER.COPYRIGHT_TEXT2}
          </p>
        </div>
      </div>

      <Link
        href={"#top"}
        scroll
        className="hidden fixed bottom-[10px] sm:bottom-[50px] -right-10 sm:right-[50px]"
        id="toTopDiv"
      >
        <CaretUp
          size={32}
          weight="light"
          className="text-blue-100 duration-300 hover:text-blue-400"
        />
      </Link>
    </footer>
  );
};
