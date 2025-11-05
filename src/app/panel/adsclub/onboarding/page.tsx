"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { AdsClubLogo } from "@/components/panel/adsClubLogo";
import { CreditDisplay } from "@/components/panel/CreditDisplay";
import { usePointsStore } from "@/store/usePointsStore";

import introImage1 from "@/assets/images/intro-img-01.jpg";
import introImage2 from "@/assets/images/intro-img-02.jpg";
import introImage3 from "@/assets/images/intro-img-03.jpg";
import introImage4 from "@/assets/images/intro-img-04.jpg";
import introImage5 from "@/assets/images/intro-img-05.jpg";

function IntroPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = Number(searchParams.get("step") ?? 1);

  const slides = useMemo(
    () => [
      {
        id: 1,
        image: introImage1,
        title: "خوشحالیم که اینجا هستی",
        content:
          "توی ادزکلاب ما یه فضای امن و منصفانه ایجاد کردیم تا اثربخشی تبلیغات رو افزایش بدیم. اینجا آگهی‌ها و پیشنهادات ویژه به صورت هدفمند ارسال میشن و فقط به مخاطبی میرسن که بهشون نیاز داره.",
        btnText: "متوجه شدم",
      },
      {
        id: 2,
        image: introImage2,
        title: "حفظ حریم شخصی",
        content:
          "تو ادزکلاب، هیچ اطلاعات شخصی از شما جمع‌آوری و نمایش داده نمیشه. آگهی دهندگان و سایر کاربران برخلاف پلتفرم‌های اجتماعی دیگه امکان دسترسی به حساب کاربری شما و ارسال پیام بهتون رو ندارن.",
        btnText: "متوجه شدم",
      },
      {
        id: 3,
        image: introImage3,
        title: "شخصی‌سازی واقعی",
        content:
          "در اینستاگرام و فیس‌بوک، الگوریتم و در تلگرام، ادمین‌ها تصمیم میگیرن که شما چه چیزی رو ببینید. ولی تو ادزکلاب فقط شما هستید که مشخص می‌کنید چه محتوایی و با چه موضوعاتی براتون ارسال بشه.",
        btnText: "متوجه شدم",
      },
      {
        id: 4,
        image: introImage4,
        title: "بدون اسپم و هدفمند",
        content:
          "تو ادزکلاب، برخلاف پلتفرم‌های دیگه خبری از بمباران تبلیغاتی، پیام‌های تکراری و غیرمرتبط، ربات و اسپم نیست. شما فقط آگهی‌های مرتبط با علاقه‌مندی‌های خودتون رو در زمان‌بندی معین دریافت می‌کنید.",
        btnText: "متوجه شدم",
      },
      {
        id: 5,
        image: introImage5,
        title: "سیستم کسب امتیاز",
        content:
          "تو ادزکلاب، برای ایجاد جذابیت و قدردانی از کاربران فعال و وفادار یک سیستم امتیازدهی وجود داره. با جمع‌آوری امتیازهای بیشتر، اعتبار استفاده از خدمات ویژه، تخفیف‌ها و آفرها براتون فعال میشه.",
        btnText: "بـزن بـریـم (45+ امتیاز)",
      },
    ],
    [],
  );

  const goToStep = (s: number) => {
    router.replace(`?step=${s}`);
  };

  const nextStep = () => {
    if (step < slides.length) {
      goToStep(step + 1);
      addPoints(1);

      if (step === slides.length - 1) {
        toast.success("تبریک میگم، شما تا این لحظه 5 امتیاز کسب کردید.");
      }
    }
  };

  const addPoints = usePointsStore((state) => state.addPoints);

  useEffect(() => {
    addPoints(1);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 p-4">
      <div className="flex w-full items-center justify-between">
        <AdsClubLogo />

        <CreditDisplay />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="flex w-full flex-1 items-end justify-center">
          <Image
            src={
              slides[step - 1]?.image || "/images/join/adsclub/intro-img-01.jpg"
            }
            width={240}
            height={240}
            alt="slide"
            priority
          />
        </div>
        <div className="space-y-2 text-center">
          {slides[step - 1]?.title && (
            <h1 className="text-lg font-semibold">{slides[step - 1].title}</h1>
          )}
          <p className="text-gray-700">{slides[step - 1]?.content}</p>
        </div>
      </div>

      <div className="flex flex-row-reverse gap-1.5">
        {slides.map((slide) => {
          const isPastStep = slide.id < step;
          const isCurrent = slide.id === step;

          return (
            <button
              key={slide.id}
              onClick={() => isPastStep && goToStep(slide.id)}
              disabled={!isPastStep}
              className={`h-1.5 w-6 rounded transition-colors ${
                isCurrent
                  ? "bg-blue-600"
                  : isPastStep
                    ? "bg-gray-300 hover:bg-blue-700"
                    : "cursor-not-allowed bg-gray-200"
              }`}
            />
          );
        })}
      </div>

      <div className="flex w-full flex-col gap-2">
        {step < slides.length ? (
          <Button onClick={nextStep} className="w-full">
            <ArrowRight />
            {slides[step - 1]?.btnText}
          </Button>
        ) : (
          <Button className="w-full" asChild>
            <Link href="/panel/adsclub/onboarding/register">
              {slides[step - 1]?.btnText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default function IntroPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IntroPageContent />
    </Suspense>
  );
}
