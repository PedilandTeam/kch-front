import Link from "next/link";
import { Button } from "../ui";
import { AdsItem } from "./AdsItem";
import { AdsData, adsData } from "@/constants/ads-data";

export const AdsList = () => {
  return (
    <section className="flex flex-1 flex-col space-y-3 rounded-t-3xl bg-gradient-to-b from-blue-200 to-blue-100 p-4">
      <h2 className="mb-4 text-center font-semibold text-blue-900">
        آگـهـی هـای جـدیـد
      </h2>

      {adsData.length > 0 ? (
        <>
          {adsData.slice(0, 5).map((ad: AdsData) => (
            <AdsItem key={ad.id} {...ad} className="border-none" />
          ))}

          <Button
            variant="ghost"
            className="w-full font-normal text-blue-900"
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
