"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import slider01 from "@/assets/images/banners/home-01.webp";
import slider02 from "@/assets/images/banners/home-02.webp";
import slider03 from "@/assets/images/banners/home-03.webp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui";

export const HomeSlider = () => {
  const router = useRouter();

  return (
    <Carousel
      opts={{
        direction: "rtl",
        loop: true,
        align: "center",
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="slider relative flex h-[440px] content-center justify-center rounded-xl">
            <Image
              className="rounded-xl object-cover brightness-[.70]"
              src={slider01}
              placeholder="blur"
              width={390}
              height={545}
              alt="a Woman is holding a globe"
              priority
            />
            <div className="absolute flex h-full w-full items-end justify-center p-4 pb-6">
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-full rounded-md bg-teal-900/60 px-3 py-2.5 text-center text-white">
                  <h3 className="h-6.5">اگر خارج از ایران کسب و کار دارید</h3>
                  <h2 className="text-[20px] font-semibold">
                    به یک تیم حـرفـه‌ای اعتماد کنید
                  </h2>
                </div>
                <p className="px-3 text-center leading-relaxed font-light text-white drop-shadow-sm drop-shadow-black/50">
                  ما، تمام نیازهای فناوری و بازاریابی دیجیتال شما را با کیفیت
                  بالا انجام میدیم.
                </p>
                <Button
                  variant="ghost"
                  className="rounded-full border border-yellow-600/20 bg-yellow-400/70 font-normal text-white"
                  onClick={() => router.push("/business-center")}
                >
                  مـشـاهـده خـدمـات
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="slider relative flex h-[440px] content-center justify-center rounded-xl">
            <Image
              className="rounded-xl object-cover brightness-[.50]"
              src={slider02}
              placeholder="blur"
              width={390}
              height={545}
              alt="a Woman is holding a globe"
              priority
            />
            <div className="absolute flex h-full w-full items-end justify-center p-4 pb-6">
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-full rounded-md bg-teal-600/60 px-3 py-2.5 text-center text-white">
                  <h2 className="text-[20px] font-semibold">
                    از شلوغی گروه‌های تلگرامی رها شو
                  </h2>
                </div>
                <p className="px-3 text-center leading-relaxed font-light text-white drop-shadow-sm drop-shadow-black/50">
                  دیگه نیازی نیست وقت‌تون رو برای پیدا کردن خدمات و مشاغل ایرانی
                  توی تلگرام صرف کنید. ما یک راهکار ساده براتون داریم.
                </p>
                <Button
                  variant="ghost"
                  className="rounded-full border border-yellow-600/20 bg-yellow-400/70 font-normal text-white"
                  onClick={() => router.push("/adsclub")}
                >
                  سرویس Ads Club
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="slider relative flex h-[440px] content-center justify-center rounded-xl">
            <Image
              className="rounded-xl object-cover brightness-[.55]"
              src={slider03}
              placeholder="blur"
              width={390}
              height={545}
              alt="a Woman is holding a globe"
              priority
            />
            <div className="absolute flex h-full w-full items-end justify-center p-4 pb-6">
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-full rounded-md bg-sky-600/70 px-3 py-2.5 text-center text-white">
                  <h2 className="text-xl font-medium">
                    برای ایرانیان مهـاجـر مقیم همه‌جـا
                  </h2>
                </div>
                <p className="px-3 text-center leading-relaxed font-light text-white drop-shadow-sm drop-shadow-black/50">
                  ما از طریق یک راهکار واحد به همه ایرانیان مهاجر سراسر دنیا
                  خدمات ارائـه می‌کنیم تا شاید بهانه‌ای برای اتـحـاد و همـدلی
                  باشیم.
                </p>
                <Button
                  variant="ghost"
                  className="rounded-full border border-yellow-600/20 bg-yellow-400/70 font-normal text-white"
                  onClick={() => router.push("/about")}
                >
                  دربـاره کـوچـا
                </Button>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="top-8 left-2 border-0 bg-transparent p-0! text-white [&_svg]:size-6" />
      <CarouselNext className="top-8 right-2 border-0 bg-transparent p-0! text-white [&_svg]:size-6" />
    </Carousel>
  );
};
