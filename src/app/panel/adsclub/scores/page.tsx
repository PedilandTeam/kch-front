"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/panel/PageHeader";
import { e2p } from "@/utils/e2p";

const scores = [
  {
    activity: "ثبت نام",
    points: 50,
    type: "ثابت",
  },
  {
    activity: "فیلدهای اختیاری",
    points: 10,
    type: "مشروط",
  },
  {
    activity: "مشاهده آگهی",
    points: 1,
    type: "مکرر",
  },
  {
    activity: "تعامل با آگهی",
    points: 4,
    type: "مکرر",
  },
  {
    activity: "دعوت از دوستان",
    points: 50,
    type: "مکرر",
  },
];

const levels = [
  {
    name: <span className="font-medium text-yellow-700/80">برنزی</span>,
    min_point: 0,
    features: ["مدیریت علایق", "مشاهده آگهی", "دعوت از دوستان"],
  },
  {
    name: <span className="font-medium text-slate-500/90">نقره</span>,
    min_point: 500,
    features: ["شرکت در نظرسنجی", "دریافت آفرهای ویژه"],
  },
  {
    name: <span className="font-medium text-yellow-500/90">طلایی</span>,
    min_point: 1000,
    features: ["اولویت دریافت آفرهای محدود", "Focus Mode"],
  },
  {
    name: <span className="text-primary font-medium">VIP</span>,
    min_point: 5000,
    features: ["بزودی..."],
  },
];

export default function InterestsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon="CoinsIcon"
        title="سیستم امتیازات"
        className="sticky top-0 z-50 -mt-3 flex h-14 flex-row items-center"
      />

      <div className="-mt-5 space-y-4">
        <p>
          در AdsClub برای افزایش جذابیت و قدردانی از کاربران فعال و وفادار، یک
          سیستم امتیازدهی طراحی شده است. کاربران با انجام فعالیت‌های مختلف و
          جمع‌آوری امتیازهای بیشتر، می‌توانند به امکانات ویژه، اعتبارهای اختصاصی
          و دسترسی اولویت‌دار به آفرهای محدود و ارزشمند دست پیدا کنند.
        </p>

        <div className="space-y-5">
          <div>
            <h2 className="text-primary mb-1 font-semibold">
              چطور امتیاز کسب کنیم؟
            </h2>
            <p>
              تمام فعالیت‌هایی که باعث افزایش امتیاز شما می‌شوند، همراه با مقدار
              امتیاز هر فعالیت، در جدول زیر درج شده‌اند. این جدول به‌صورت
              دوره‌ای بروزرسانی می‌شود و هر تغییر جدیدی در سیستم امتیازدهی، از
              طریق ربات AdsClub به شما اطلاع‌رسانی خواهد شد.
            </p>
          </div>

          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="text-primary">فعالیت</TableHead>
                <TableHead className="text-primary">امتیاز</TableHead>
                <TableHead className="text-primary">نوع</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score, i) => (
                <TableRow key={i}>
                  <TableCell>{score.activity}</TableCell>
                  <TableCell className="text-primary font-medium">
                    {e2p(score.points)}
                  </TableCell>
                  <TableCell>{score.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-sm">
            <h3 className="mb-2 font-semibold">راهنمای نوع امتیازات:</h3>
            <ul className="space-y-1 pr-2">
              <li>
                <span className="text-primary font-medium">-- ثابت:</span> فقط
                یک‌بار اعمال می‌شوند و تکرارپذیر نیستند.
              </li>
              <li>
                <span className="text-primary font-medium">-- مکرر:</span> با هر
                بار انجام، امتیاز آن به‌صورت جداگانه محاسبه می‌شود.
              </li>
              <li>
                <span className="text-primary font-medium">-- مشروط:</span> تا
                زمانی که شرایط مشخص برقرار باشد امتیاز فعال است و در صورت از بین
                رفتن آن شرایط، امتیاز کسر می‌شود.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-primary mb-1 font-semibold">
              چطور از امتیازات استفاده کنیم؟
            </h2>
            <p className="mb-1.5">
              با افزایش امتیازات، سطح کاربری شما ارتقا پیدا می‌کند و امکانات و
              آفرهای ویژه برایتان فعال می‌شوند. سطح‌های کاربری و توضیحات مربوط
              به هر سطح در جدول زیر قابل مشاهده است و هرگونه تغییر یا فعال‌سازی
              جدید از طریق ربات AdsClub به شما اطلاع‌رسانی خواهد شد.
            </p>
            <p>
              هنگام استفاده از امکانات یا آفرهای فعال‌شده، مقدار امتیاز موردنیاز
              به‌صورت خودکار از امتیازات شما کسر می‌شود.
            </p>
          </div>

          <Table>
            <TableHeader className="bg-blue-50">
              <TableRow>
                <TableHead className="text-primary">سطح</TableHead>
                <TableHead className="text-primary">امتیاز</TableHead>
                <TableHead className="text-primary">امکانات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((level, i) => (
                <TableRow key={i}>
                  <TableCell>{level.name}</TableCell>
                  <TableCell className="text-primary font-medium">
                    {e2p(level.min_point)}
                  </TableCell>
                  <TableCell>
                    {level.features.map((f, j) => (
                      <div key={j}>{f}</div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
