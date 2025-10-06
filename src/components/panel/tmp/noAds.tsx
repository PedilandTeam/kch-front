import { Button } from "@/components/index";
import { PlusIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function NoAds() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-6">
      <Image
        src={"/images/storyset/Empty-pana.svg"}
        width={250}
        height={250}
        alt="پیدا نشد"
      />
      <p className="text-center text-4xl font-medium">
        شما هنوز هیچ آگهی‌ای ندارید!
      </p>
      <Link href={"/account/ads/new"}>
        <Button className="btn-primary btn-md">
          افزودن آگهی جدید <PlusIcon className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
