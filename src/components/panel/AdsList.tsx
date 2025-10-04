import Link from "next/link";
import { Button } from "../ui";
import { AdsItem } from "./AdsItem";
import type { AdsData } from "@/constants/ads-data";
import { adsData } from "@/constants/ads-data";

export const AdsList = () => {
  return (
    <section className="login-bg flex flex-1 flex-col space-y-3 rounded-t-3xl bg-no-repeat bg-cover p-4 pt-5">
      <h2 className="mb-5 text-center font-semibold text-white">
        آگـهـی هـای جـدیـد
      </h2>

      {adsData.length > 0 ? (
        <>
          {adsData.slice(0, 5).map((ad: AdsData) => (
            <AdsItem key={ad.id} {...ad} className="border-none" />
          ))}

          <Button
            variant="ghost"
            className="w-full font-normal text-white"
            asChild
          >
            <Link href="/panel/adsclub/explore">
              مـشـاهـده تـمـام آگـهـی‌هـا
            </Link>
          </Button>
        </>
      ) : (
        <p className="flex flex-1 items-center justify-center text-center text-sm text-blue-900">
          آگهی جدید برای نمایش وجود ندارد.
        </p>
      )}
    </section>
  );
};
