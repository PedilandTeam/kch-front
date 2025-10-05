import { At, InstagramLogo, Headset } from "@phosphor-icons/react";
import Link from "next/link";

const CardsGroup = () => {
  return (
    <div className="container mx-auto mt-10 max-w-[1144px] px-3 sm:px-0">
      <div className="card-group grid gap-4 sm:grid-cols-3 sm:gap-8">
        <div className="card border-[2px] border-gray-100 shadow-lg">
          <div className="card-body p-8">
            <div className="icon flex justify-center text-blue-900">
              <Headset size={40} weight="duotone" />
            </div>
            <h2 className="card-title mt-4 justify-center text-[18px]">
              پشتیبانی در تلگرام
            </h2>
            <p
              className="font-PinarLT text-center text-[18px] text-gray-500"
              dir="ltr"
            >
              <Link
                className="hover:text-pink-800"
                href={"https://t.me/koochaa_support"}
                target={"_blank"}
              >
                @koochaa_support
              </Link>
            </p>
          </div>
        </div>

        <div className="card border-[2px] border-gray-100 shadow-lg">
          <div className="card-body p-8">
            <div className="icon flex justify-center text-blue-900">
              <InstagramLogo size={40} weight="duotone" />{" "}
            </div>
            <h2 className="card-title mt-4 justify-center text-[18px]">
              صفحه اینستاگرام
            </h2>
            <p
              className="font-PinarLT text-center text-[18px] text-gray-500"
              dir="ltr"
            >
              <Link
                className="hover:text-pink-800"
                href={"https://www.instagram.com/_koochaa"}
                target={"_blank"}
              >
                @_koochaa
              </Link>
            </p>
          </div>
        </div>

        <div className="card border-[2px] border-gray-100 shadow-lg">
          <div className="card-body p-8">
            <div className="icon flex justify-center text-blue-900">
              <At size={40} weight="duotone" />
            </div>
            <h2 className="card-title mt-4 justify-center text-[18px]">
              ارسال ایمیل
            </h2>
            <p
              className="font-PinarLT text-center text-[18px] text-gray-500"
              dir="ltr"
            >
              <Link
                className="hover:text-pink-800"
                href={"mailto:support@koochaa.com"}
                target={"_blank"}
              >
                support@koochaa.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsGroup;
