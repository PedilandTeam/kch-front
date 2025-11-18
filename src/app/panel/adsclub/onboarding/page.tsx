"use client";

import fetchUser from "@/api/fetchUser";
import { usePointsStore } from "@/store/usePointsStore";
import { useTelegramAuth } from "@/store/useTelegramAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import introImage1 from "@/assets/images/intro-img-01.jpg";
import introImage2 from "@/assets/images/intro-img-02.jpg";
import introImage3 from "@/assets/images/intro-img-03.jpg";
import introImage4 from "@/assets/images/intro-img-04.jpg";
import introImage5 from "@/assets/images/intro-img-05.jpg";

import { AdsClubLogo } from "@/components/panel/adsClubLogo";
import { CreditDisplay } from "@/components/panel/CreditDisplay";
import { Loader } from "@/components/ui-custom/Loader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { e2p } from "@/utils/e2p";

function IntroPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const step = Number(searchParams.get("step") ?? 1);

  const {
    resetPoints,
    addPoints,
    markOnboardingStep,
    onboardingSteps,
    hasHydrated,
  } = usePointsStore((state) => state);

  const { userData, isLoading } = useTelegramAuth();

  useEffect(() => {
    if (isLoading) return;

    async function loadUser() {
      const res = await fetchUser();

      if (res.ok && res.isActive) {
        router.replace("/panel/adsclub");
        return;
      }

      setLoading(false);
    }

    loadUser();
  }, [isLoading]);

  const slides = useMemo(
    () => [
      {
        id: 1,
        image: introImage1,
        title: "خوشحالیم که اینجا هستی",
        content:
          "در AdsClub ما یک فضای امن، منصفانه و کارآمد ایجاد کردیم تا اثربخشی تبلیغات را به‌طور واقعی افزایش دهیم. در اینجا آگهی‌ها و پیشنهادهای ویژه به‌صورت هدفمند ارسال می‌شود و فقط به مخاطبان واقعی آن میرسد.",
        btnText: "متوجه شدم",
      },
      {
        id: 2,
        image: introImage2,
        title: "حفظ حریم شخصی",
        content:
          "در AdsClub هیچ‌گونه اطلاعات شخصی از شما جمع‌آوری یا نمایش داده نمی‌شود. برخلاف پلتفرم‌های اجتماعی دیگر، آگهی‌دهندگان و سایر کاربران امکان دسترسی به اطلاعات حساب کاربری و ارسال پیام به شما را ندارند.",
        btnText: "متوجه شدم",
      },
      {
        id: 3,
        image: introImage3,
        title: "شخصی‌سازی واقعی",
        content:
          "در اینستاگرام و فیس‌بوک، الگوریتم‌ها و در تلگرام ادمین‌ها هستند که تعیین می‌کنند چه چیزی محتوا را برایتان انتخاب می‌کنند. اما در AdsClub فقط شما هستید که مشخص می‌کنید چه محتوایی و با چه موضوعاتی برایتان ارسال شود.",
        btnText: "متوجه شدم",
      },
      {
        id: 4,
        image: introImage4,
        title: "بدون اسپم و هدفمند",
        content:
          "در AdsClub، برخلاف پلتفرم‌های دیگر، خبری از بمباران تبلیغاتی، پیام‌های تکراری و غیرمرتبط، ربات‌ها و اسپم نیست. شما فقط آگهی‌هایی را دریافت می‌کنید که با علاقه‌مندی‌های خودتان هماهنگ باشند و آن هم تنها هفته‌ای یک بار.",
        btnText: "متوجه شدم",
      },
      {
        id: 5,
        image: introImage5,
        title: "سیستم کسب امتیاز",
        content:
          "در AdsClub، برای ایجاد جذابیت و قدردانی از کاربران فعال و وفادار، یک سیستم امتیازدهی طراحی شده است. با جمع‌آوری امتیازهای بیشتر، دسترسی شما به خدمات ویژه، تخفیف‌ها و آفرهای اختصاصی فعال می‌شود.",
        btnText: "تکمیل ثبت نام (45+ امتیاز)",
      },
    ],
    [],
  );

  const goToStep = (s: number) => {
    router.replace(`?step=${s}`);
  };

  useEffect(() => {
    if (!hasHydrated) return;

    const currentStep = searchParams.get("step");
    if (currentStep) return;

    resetPoints(1);
  }, [hasHydrated]);

  const nextStep = () => {
    const isAlreadyDone = onboardingSteps.includes(step);

    if (step < slides.length) {
      goToStep(step + 1);

      if (!isAlreadyDone) {
        addPoints(1);
        markOnboardingStep(step);
      }

      if (step === slides.length - 1) {
        toast.success("تبریک میگم، شما تا این لحظه 5 امتیاز کسب کردید.");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-5">
      <div className="flex w-full items-center justify-between">
        <AdsClubLogo />
        <CreditDisplay />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <div className="text-primary font-medium">
          {userData?.user?.first_name} عزیز
        </div>

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
        <div className="space-y-4 text-center">
          {slides[step - 1]?.title && (
            <h1 className="text-lg font-semibold">{slides[step - 1].title}</h1>
          )}
          <div className="text-gray-600">{slides[step - 1]?.content}</div>
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
              {e2p(slides[step - 1]?.btnText)}
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
