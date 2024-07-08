"use client";
import { List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useHeader } from "@/store/useHeader";
import { OffCanvas } from "@/app/(Site)/layout/offcanvas";
import { CountryNamespace } from "@/types/country";
import { CircleFlag } from "next-circle-flags";
import { log } from "console";
export default function BottomMenu({
  countries,
}: {
  countries: CountryNamespace.GET[];
}) {
  const params = useParams();

  const { countryCode: contryCodeInStore, isNotFound } = useHeader();

  const [countryCode, setCountryCode] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY);

    if (currentScrollY > lastScrollY) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);



  useEffect(() => {
    const countryOrSlug = params.countryOrSlug as string;
    const isMainPage =
      !countryOrSlug || !countries?.find((c) => c.code === countryOrSlug);
    const countryCodeFromParams = isMainPage ? "" : countryOrSlug;
    setCountryCode(
      isMainPage ? "un" : countryCodeFromParams || contryCodeInStore || "un"
    );
  }, [params, countries, contryCodeInStore]);

  const isMainPage =
    !contryCodeInStore && (countryCode == "un" || !countryCode);
  console.log(isMainPage, contryCodeInStore, countryCode);


  
  return (
    <>
      <div className="h-full z-50">
        <OffCanvas countryCode={countryCode} />
      </div>

      <div
        className={`fixed bottom-2 w-full  transition-transform duration-300 transform ${
          isVisible ? "translate-y-0" : "translate-y-100"
        } z-0 md:hidden`}
      >
        <div className="flex items-center justify-between px-6 py-2 mx-2 bg-white border border-gray-200 rounded-full wraper">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div
              className="select-country"
              onClick={() => {
                if (document) {
                  (
                    document.getElementById("modal_country") as HTMLFormElement
                  )?.showModal();
                }
              }}
            >
              <div className="flex">
                {" "}
                <CircleFlag
                  width={20}
                  height={10}
                  loading={"lazy"}
                  alt={`Logo of country with ISO code ${countryCode}`}
                  countryCode={countryCode}
                  className="w-[28px] h-[28px] transition opacity-75 hover:opacity-100 hover:cursor-pointer "
                />
              </div>
            </div>
            <span className="inline-flex justify-center text-xs ">
              انتخاب کشور
            </span>
          </div>

          <Link href="/account">
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className=" avatar">
                <Image
                  src="/images/user-avatar.jpg"
                  className="border-2 w-[28px] h-[28px] rounded-full"
                  width={16}
                  height={16}
                  alt="User Avatar"
                />
              </div>
              <span className="inline-flex justify-center text-xs">
                حساب کاربری
              </span>
            </div>
          </Link>

          <div
            onClick={() => document.getElementById("main-drawer")?.click()}
            className="flex flex-col gap-[2px] items-center justify-between"
          >
            <div className="flex justify-center cursor-pointer p-1 bg-blue-50 rounded-full">{" "}
            <List size={20} color="#282828" />
            </div>
            <span className="inline-flex justify-center text-xs">منو</span>
          </div>

          <Link href="/">
            <div className="flex items-center justify-center">
              <Image
                src="/images/logo-01.png"
                width={36}
                height={36}
                priority={true}
                alt="Koochaa Logo"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
