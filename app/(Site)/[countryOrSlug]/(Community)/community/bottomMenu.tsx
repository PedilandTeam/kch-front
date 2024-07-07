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
export default function BottomMenu({
  countries,
}: {
  countries: CountryNamespace.GET[];
}) {
  const params = useParams();

  const { countryCode: contryCodeInStore, isNotFound } = useHeader();

  const [countryCode, setCountryCode] = useState("");

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
    <div className="fixed z-50 w-full md:hidden bottom-2">
      <div className="flex items-center justify-between px-6 py-2 mx-2 bg-white border border-gray-300 rounded-full wraper">
        <div className="flex flex-col items-center justify-center">
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
            <div className="w-[1.6rem]">
              {" "}
              <CircleFlag
                width={20}
                height={20}
                loading={"lazy"}
                alt={`Logo of country with ISO code ${countryCode}`}
                countryCode={countryCode}
                className="w-[40px] h-[40px] transition opacity-75 hover:opacity-100 hover:cursor-pointer "
              />
            </div>
          </div>
          <span className="inline-flex justify-center text-xs">
            انتخاب کشور
          </span>
        </div>

        <Link href="/account">
          {" "}
          <div className="flex flex-col items-center justify-center">
            <div className="mb-1 avatar">
              <Image
                src="/images/user-avatar.jpg"
                className="border-2 rounded-full"
                width={17}
                height={17}
                alt="User Avatar"
              />
            </div>
            <span className="inline-flex justify-center  text-xs">
              حساب کاربری
            </span>
          </div>
        </Link>

        <div
          onClick={() => document.getElementById("main-drawer")?.click()}
          className="flex flex-col items-center justify-center"
        >
          <List size={30} color="#282828" />
          <span className="inline-flex justify-center text-xs">منو</span>
        </div>

        <Link href="/">
          <div className="flex mt-1 flex-col items-center justify-center">
            <Image
              src="/images/logo-01.png"
              width={28}
              height={28}
              priority={true}
              alt="Koochaa Logo"
            />
            <span className=" inline-flex justify-center items-center text-xs">
              خانه
            </span>
          </div>
        </Link>
      </div>
      <OffCanvas countryCode={countryCode} />
    </div>
  );
}
