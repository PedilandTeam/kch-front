import Link from "next/link";

import {
  AtIcon,
  HeadsetIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "../ui";

export const ContactMethods = () => {
  return (
    <div className="_contact-methods space-y-2">
      <Link
        href={"https://t.me/koochaa_support"}
        target={"_blank"}
        className="flex w-full"
      >
        <Card className="w-full border-blue-200 bg-blue-50 shadow-none">
          <CardContent className="flex items-center gap-3 px-4 py-3">
            <div>
              <HeadsetIcon
                size={36}
                weight="duotone"
                className="text-blue-500"
              />
            </div>
            <div className="font-medium text-blue-600">پشتیبانی در تلگرام</div>
          </CardContent>
        </Card>
      </Link>
      <Link
        href={"https://www.instagram.com/_koochaa"}
        target={"_blank"}
        className="flex w-full"
      >
        <Card className="w-full border-purple-200 bg-purple-50 shadow-none">
          <CardContent className="flex items-center gap-3 px-4 py-3">
            <div>
              <InstagramLogoIcon
                size={36}
                weight="duotone"
                className="text-purple-500"
              />
            </div>
            <div className="font-medium text-purple-600">صفحه اینستاگرام</div>
          </CardContent>
        </Card>
      </Link>
      <Link
        href={"mailto:support@koochaa.com"}
        target={"_blank"}
        className="flex w-full"
      >
        <Card className="w-full border-stone-200 bg-stone-50 shadow-none">
          <CardContent className="flex items-center gap-3 px-4 py-3">
            <div>
              <AtIcon size={36} weight="duotone" className="text-stone-500" />
            </div>
            <div className="font-medium text-stone-700">ارسال ایمیل</div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
