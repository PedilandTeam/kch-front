import {
  At,
  InstagramLogo,
  Headset,
} from "app/client-packages/phosphor-icons/react";
import Link from "next/link";

const CardsGroup = () => {
  return (
    <div className="container max-w-[1144px] mx-auto mt-10 px-3 sm:px-0">
      <div className="grid gap-4 card-group sm:grid-cols-3 sm:gap-8">
        <div className="card shadow-lg border-[2px] border-gray-100">
          <div className="p-8 card-body">
            <div className="flex justify-center text-blue-900 icon">
              <Headset size={40} weight="duotone" />
            </div>
            <h2 className="card-title text-[18px] justify-center mt-4">
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

        <div className="card shadow-lg border-[2px] border-gray-100">
          <div className="p-8 card-body">
            <div className="flex justify-center text-blue-900 icon">
              <InstagramLogo size={40} weight="duotone" />{" "}
            </div>
            <h2 className="card-title text-[18px] justify-center mt-4">
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

        <div className="card shadow-lg border-[2px] border-gray-100">
          <div className="p-8 card-body">
            <div className="flex justify-center text-blue-900 icon">
              <At size={40} weight="duotone" />
            </div>
            <h2 className="card-title text-[18px] justify-center mt-4">
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
