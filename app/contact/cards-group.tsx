import {
  AtSymbolIcon,
  ChatBubbleBottomCenterTextIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const CardsGroup = () => {
  return (
    <div className="container max-w-[1144px] mx-auto mt-10 px-3 sm:px-0">
      <div className="card-group grid sm:grid-cols-3 gap-4 sm:gap-8">
        <div className="card shadow-lg border-[2px] border-gray-100">
          <div className="card-body p-8">
            <div className="icon flex justify-center">
              <ChatBubbleBottomCenterTextIcon className="w-[46px] h-[46px] stroke-blue-900" />
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
          <div className="card-body p-8">
            <div className="icon flex justify-center">
              <AtSymbolIcon className="w-[46px] h-[46px] stroke-blue-900" />
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

        <div className="card shadow-lg border-[2px] border-gray-100">
          <div className="card-body p-8">
            <div className="icon flex justify-center">
              <DevicePhoneMobileIcon className="w-[46px] h-[46px] stroke-blue-900" />
            </div>
            <h2 className="card-title text-[18px] justify-center mt-4">
              تماس در واتس‌آپ
            </h2>
            <p
              className="font-PinarLT text-center text-[18px] text-gray-500"
              dir="ltr"
            >
              <Link
                className="hover:text-pink-800"
                href={"https://wa.me/+4917687953645"}
                target={"_blank"}
              >
                +49 176 8795 3645
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsGroup;
