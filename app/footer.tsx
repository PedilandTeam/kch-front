"use client";
import Link from "next/link";
import { _TXT } from "@/app/text";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export const Footer = () => {
  // useEffect(() => {
  //   if (typeof window == "undefined") return;
  //   var toTopDiv = document.getElementById("toTopDiv");
  //   if (!toTopDiv) return;
  //   window.addEventListener("scroll", function () {
  //     var toTopDiv = document.getElementById("toTopDiv");
  //     if (window.scrollY > 600) {
  //       // Change the value as needed
  //       toTopDiv!.classList.remove("hidden");
  //     } else {
  //       toTopDiv!.classList.add("hidden");
  //     }
  //   });
  // }, []);

  return (
    <div className="pt-10 pb-6 sm:pb-8 mt-5 sm:mt-10 bg-blue-950 text-gray-50">
      <footer className="footer footer-center container px-3 mx-auto max-w-[1144px]">
        <div className="grid sm:grid-flow-col gap-3 sm:gap-4 text-[15px]">
          <Link href={"/about"} className="link link-hover">
            {_TXT.MENU.ABOUT}
          </Link>
          {/* <Link href={"/privacy"} className="link link-hover">
            {_TXT.MENU.PRIVACY_POLICIES}
          </Link> */}
          <Link href={"/terms"} className="link link-hover">
            {_TXT.MENU.TERMS_AND_CONDITIONS}
          </Link>
          <Link href={"/contact"} className="link link-hover">
            {_TXT.MENU.CONTACT_US}
          </Link>
        </div>
        <div>
          <div className="grid grid-flow-col gap-3">
            <Link
              href={"https://www.instagram.com/_koochaa"}
              target="_blank"
              className="bg-slate-500 p-2 rounded hover:bg-pink-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </Link>

            <Link
              href={"https://www.linkedin.com/company/koochaa"}
              target="_blank"
              className="bg-slate-500 p-2 rounded hover:bg-pink-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M5.8,22.5H1V8.2h4.8V22.5z M3.4,6.3C2.1,6.3,1,5.2,1,3.9s1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4C5.8,5.2,4.7,6.3,3.4,6.3z
	 M23,22.5h-4.6v-7c0-1.7,0-3.8-2.4-3.8c-2.4,0-2.8,1.8-2.8,3.7v7.1H8.7V8.2h4.4v2h0.1c0.6-1.1,2.1-2.3,4.4-2.3c4.7,0,5.5,3,5.5,6.8
	C23,14.7,23,22.5,23,22.5z"
                />
              </svg>
            </Link>

            <Link
              href={"https://www.facebook.com/koochaa.fb"}
              target="_blank"
              className="bg-slate-500 p-2 rounded hover:bg-pink-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </Link>

            {/* <Link href={"https://www.youtube.com"} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </Link> */}

            <Link
              href={"https://twitter.com/_koochaa"}
              target="_blank"
              className="bg-slate-500 p-2 rounded hover:bg-pink-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path
                  d="M0.6,1l8.5,12.1L0.5,23.2h2.3l7.3-8.6l6,8.6h7.3L14.2,9.9L21.7,1h-2.3l-6.3,7.4L7.9,1H0.6z M4.1,2.8h2.8l13,18.5h-2.8
	L4.1,2.8z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div>
          <p className="font-light">
            {_TXT.FOOTER.COPYRIGHT_TEXT1}
            <Link href="/" className="inline-flex mx-1 link link-hover">
              {_TXT.GENERAL.KOOCHAA}
            </Link>
            {_TXT.FOOTER.COPYRIGHT_TEXT2}
          </p>
        </div>
      </footer>
      {/* <Link
        href={"#top"}
        scroll
        className="hidden fixed bottom-[10px] sm:bottom-[50px] right-0 sm:right-[50px] p-3 rounded-full"
        id="toTopDiv"
      >
        <RocketLaunchIcon className="w-[36px] h-[36px] -rotate-45 stroke-gray-400" />
      </Link> */}
    </div>
  );
};
