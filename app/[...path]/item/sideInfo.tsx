import Button from "@client-packages/chakra-ui/button"
import {
  ArrowTopRightOnSquareIcon,
  ArrowUturnRightIcon,
  HandRaisedIcon,
  PencilIcon,
  PhoneArrowUpRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const ItemSideInfo = () => {
  return (
    <div className="item-side sm:col-span-4 sm:col-end-13 mx-3 sm:mr-3 sm:ml-0">
      <div className="rounded-md border border-gray-200 p-5 mb-3">
        <div className="item-contact">
          <div className="ct-website flex justify-between pb-3 border-b border-gray-200">
            <Link href="#" target="_blank">
              <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-500" />
            </Link>
            <span>www.koochaa.com</span>
          </div>

          <div className="ct-mobile flex justify-between py-3 border-b border-gray-200">
            <div className="ct-app flex">
              <Link href="#" target="_blank">
                <Image
                  alt="whatsapp"
                  src={"/img/icon/whatsapp-outline.svg"}
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </Link>
              <Link href="#" target="_blank">
                <Image
                  alt="telegram"
                  src={"/img/icon/telegram-outline.svg"}
                  width={20}
                  height={20}
                  className="ml-2"
                />
              </Link>
              <Link href="#" target="_blank">
                <PhoneArrowUpRightIcon className="w-5 h-5 text-gray-500" />
              </Link>
            </div>
            <span className="font-PinarLT text-[15px]" dir="ltr">
              +49 163 9514203
            </span>
          </div>

          <div className="ct-phone flex justify-between py-3 border-b border-gray-200">
            <Link href="#" target="_blank">
              <PhoneArrowUpRightIcon className="w-5 h-5 text-gray-500" />
            </Link>
            <span className="font-PinarLT text-[15px]" dir="ltr">
              +49 21 4421124
            </span>
          </div>

          <div className="ct-address flex justify-between pt-3 pb-5">
            <ArrowUturnRightIcon className="w-5 h-5 text-gray-500" />
            <p className="whitespace-pre font-PinarLT text-left" dir="ltr">
              <span>Rathenauerplatz 1</span>
              <br />
              <span>50674</span>, <span>Frankfurt</span>
            </p>
          </div>

          <Button
            variant="solid"
            colorScheme="gray"
            width="100%"
            rightIcon={<HandRaisedIcon className="w-5 h-5" />}
          >
            درخواست تغییر در این صفحه
          </Button>
        </div>
      </div>
      <div className="rounded-md border border-gray-200 p-4">
        <div className="mb-7 flex justify-between">
          <Image
            alt="telegram"
            src={"/img/icon/verified-badge-100.png"}
            width={40}
            height={40}
            className="ml-2"
          />
          <XMarkIcon className="w-5 h-5 text-gray-500 mt-1 hover:cursor-pointer hover:text-gray-800" />
        </div>
        <h6 className="font-semibold mb-2">آیا شما مالک این صفحه هستید؟</h6>
        <p className="text-[14px] leading-6 text-gray-700 mb-5">
          با احراز هویت تیک آبی دریافت کنید. مدیریت اطلاعات صفحه خود را به عهده
          بگیرید، با مخاطبان خود در تماس باشید و از سایر امکانات کوچا برای دیده
          شدن صفحه خود استفاده کنید.
        </p>
        <Button variant="outline" colorScheme="gray">
          دریافت مالکیت صفحه
        </Button>
      </div>
    </div>
  );
};
