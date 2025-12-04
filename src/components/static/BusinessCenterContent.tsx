import { Button } from "../ui";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BriefcaseIcon,
  DesktopTowerIcon,
  MegaphoneSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";

export const BusinessCenterContent = () => {
  return (
    <section className="_business-center">
      <div className="section space-y-2">
        <p>
          اگر خارج از ایران کسب‌وکار دارید، می‌دانید که مدیریت و توسعه آن با
          چالش‌های معمول تفاوت‌هایی دارد.
        </p>
        <p>
          هزینه‌های طراحی و پشتیبانی وب‌سایت، مدیریت شبکه‌های اجتماعی، تبلیغات،
          بازاریابی و خدمات مدرن کسب‌وکار در کشور محل زندگی‌تان، معمولا زیاد و
          گاهی غیرمنطقی است.
        </p>
        <p>
          از طرف دیگر، استفاده از خدمات داخل ایران هم به‌دلیل مشکلات پرداخت
          بین‌المللی، عدم امکان صدور فاکتور رسمی و مهم‌تر از همه ناآشنایی بسیاری
          از مجریان با فضای واقعی کسب‌وکار خارج از ایران، اغلب نتیجه مطلوبی به
          همراه ندارد.
        </p>
        <p>
          <strong>بیزینس سنتر کـوچـا</strong> دقیقا برای حل همین چالش‌ها ایجاد
          شده است. ما با تیمی متخصص، باتجربه و آشنا به نیازهای واقعی ایرانیان
          مهاجر، خدمات حرفه‌ای را با کیفیت بالا و هزینه‌ای منصفانه ارائه
          می‌دهیم؛ تا شما بتوانید با خیال راحت روی ارزش اصلی کسب‌وکارتان از جمله
          بهبود خدمات، افزایش فروش و رسیدگی بهتر به مشتریان تمرکز کنید.
        </p>
      </div>

      <div className="section mt-8">
        <h2 className="text-secondary mb-4 flex flex-col items-center gap-1 text-lg font-bold">
          <MegaphoneSimpleIcon weight="duotone" size={40} /> تبلیغات و بازاریابی
          دیجیتال
        </h2>

        <Accordion type="single" collapsible className="accordion-bc w-full">
          <AccordionItem value="ac-11" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              تبلیغات هدفمند در AdsClub
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                ما یک بانک اطلاعاتی ارزشمند از ایرانیان مهاجر و افراد در حال
                مهاجرت ایجاد کردیم که به‌صورت مداوم به‌روز می‌شود. کاربران در
                AdsClub جنسیت، محل سکونت و نیازهای خود را مشخص می‌کنند تا فقط
                آگهی‌های مرتبط را دریافت کنند.
              </p>
              <p>
                این ساختار هدفمند به شما کمک می‌کند با کمترین هزینه و در
                کوتاه‌ترین زمان، خدمات خود را به دقیق‌ترین مخاطبان بازار هدف
                معرفی کرده و نرخ تبدیل بالاتری را به دست آورید.
              </p>
              <p>
                هزینه این سرویس بر اساس پرداخت به ازای ارسال و پرداخت به ازای
                بازدید طراحی شده است تا برای شما کاملاً منصفانه و مقرون‌به‌صرفه
                باشد.
              </p>
              <p>
                هزینه این سرویس به صورت پرداخت به ازای ارسال و پرداخت به ازای
                بازدید طراحی شده است تا برای شما منصفانه و مقرون به صرفه باشد.
              </p>
              <p>
                اگر تمایل دارید از AdsClub برای معرفی خدمات خود استفاده کنید،
                برای دریافت <strong>فایل شیوه قیمت‌گذاری</strong> با ما تماس
                بگیرید.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت لـیـسـت قـیـمـت
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-12" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              تبلیغات بنری شخصی سازی شده
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                وب‌سایت کوچا با بیش از ۵۰۰۰ بازدید ماهانه، به‌صورت ساختارمند
                طراحی شده تا ترافیک کاربران به تفکیک کشورها و دسته‌بندی‌های
                محتوایی به‌صورت شفاف قابل اندازه‌گیری و هدف‌گذاری باشد.
              </p>

              <p>
                شما می‌توانید بنر تبلیغاتی خود را در صفحه اصلی کشورهای موردنظر،
                صفحات لیست مشاغل، پزشکان، وکلا، هنرمندان و همچنین دسته‌بندی‌های
                داخلی هرکدام از آنها نمایش دهید.
              </p>
              <p>
                هزینه این سرویس به‌صورت ماهانه و بر‌اساس میانگین بازدید سه ماه
                گذشته محاسبه می‌شود تا برای شما کاملا منصفانه و مقرون‌به‌صرفه
                باشد.
              </p>
              <p>
                اگر تمایل دارید خدمات خود را از طریق بنر تبلیغاتی معرفی کنید،
                برای استعلام قیمت با ما تماس بگیرید.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت اسـتـعـلام قـیـمـت
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-13" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              ثبت در دایرکتوری کـوچـا
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                دایرکتوری کـوچـا <strong>یک صفحه رایگان</strong> برای معرفی
                حرفه‌ای در اختیار هر ایرانی شاغل در خارج از کشور قرار می‌دهد تا
                ارتباط بین ارائه‌دهندگان خدمات و مخاطبان ایرانی آنها در مناطق
                مختلف جهان آسان‌تر برقرار شود.
              </p>
              <p>
                با ثبت درخواست، یک صفحه با رابط کاربری استاندارد برای معرفی
                خدمات و نمایش اطلاعات تماس کسب‌و‌کار خود دریافت می‌کنید. این
                صفحه که برای موتورهای جستجو بهینه شده است شانس دیده شدن شما در
                نتایج اول گوگل را افزایش می‌دهد. همچنین سیستم هوشمند دایرکتوری،
                صفحه شما را به کاربرانی در جستجوی خدمات مرتبط هستند نیز پیشنهاد
                می‌دهد.
              </p>
              <p>
                با استفاده از این سرویس بدون هیج هزینه‌ای می‌توانید آگاهی از
                برند، تعداد مخاطبان واقعی و در نهایت نرخ تبدیل مشتری را به شکل
                قابل توجهی افزایش دهید.
              </p>
              <p>
                برای ثبت یا ویرایش اطلاعات کسب و کارتان کافی است با ما تماس
                بگیرید.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت ثـبـت کـسـب و کـار
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-14" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              مدیریت Google Business Profile
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                پروفایل کسب‌وکار گوگل نقش بسیار مهمی در دیده‌شدن برند شما هنگام
                جستجوی کاربران و همچنین اطلاعات ارائه شده توسط هوش مصنوعی‌های
                مولد (مانند GPTها) دارد. امتیازها و نظراتی که مشتریان ثبت
                می‌کنند نیز یکی از اصلی‌ترین عوامل اعتمادسازی و جذب مشتریان جدید
                است.
              </p>
              <p>
                با این حال، فرآیند ثبت‌نام، احراز هویت، تنظیمات اولیه و مدیریت
                مداوم این پروفایل برای بسیاری از صاحبین کسب‌وکار میسر نیست.
                بی‌توجهی به بروزرسانی‌ها یا بی‌پاسخ ماندن نظرات منفی می‌تواند
                تصویر نادرستی از برند شما ایجاد کند.
              </p>
              <p>ما بر اساس نیاز شما می‌توانیم خدمات زیر را ارائه دهیم:</p>
              <ul className="mb-4 list-disc space-y-1.5 pr-8 font-semibold">
                <li>ایجاد و احراز هویت پروفایل</li>
                <li>بروزرسانی و مدیریت حرفه‌ای اطلاعات</li>
                <li>بازیابی اطلاعات و دسترسی‌های حساب</li>
                <li>تنظیمات پیشرفته و بهینه‌سازی پروفایل</li>
                <li>تدوین استراتژی تخصصی برای مدیریت نظرات منفی</li>
              </ul>
              <p>
                برای کسب اطلاعات بیشتر، بررسی شرایط و دریافت راهکار مناسب با ما
                تماس بگیرید.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت مـشـاوره
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-15" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              ابزار دایرکت هوشمند اینستاگرام
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-16" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              طراحی و اجرای کمپین تبلیغاتی
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-17" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              مدیریت شبکه‌های اجتماعی
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-secondary mt-8 mb-4 flex flex-col items-center gap-1 text-lg font-bold">
          <DesktopTowerIcon weight="duotone" size={40} />
          خدمات فناوری و زیرساخت
        </h2>

        <Accordion type="single" collapsible className="accordion-bc">
          <AccordionItem value="ac-21" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              طراحی و بازطراحی وب‌سایت
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                در دنیای امروز فقط داشتن یک وب‌سایت کافی نیست. آنچه باعث رشد
                واقعی کسب‌وکار می‌شود، استفاده درست از ابزارهای دیجیتال موجود در
                هماهنگی کامل آن‌ها با یک وب‌سایت استاندارد و حرفه‌ای است.
              </p>
              <p>
                ما به شما کمک می‌کنیم گزینه مطلوب برای طراحی وب‌سایت‌ خود را
                انتخاب کنید و قول می‌دهیم بالاترین کیفیت را با هزینه‌ای منصفانه
                دریافت کنید.
              </p>
              <p>
                اگر در فکر طراحی یا بازطراحی وب‌سایت خود هستید، لطفا قبل از هر
                تصمیمی با ما مشورت کنید.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت مـشـاوره
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-22" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              بهینه‌سازی و بهبود عملکرد وب‌سایت
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                مشکلات فنی، لینک‌های خراب، سرعت پایین، محتوای ناقص و طراحی
                قدیمی، تجربه کاربری ناخوشایندی برای مخاطبان ایجاد می‌کند؛
                تجربه‌ای که ناخواسته به هویت برند منتقل می‌شود و تصویر حرفه‌ای
                کسب‌وکار را تحت تأثیر قرار می‌دهد.
              </p>
              <p>
                بسیاری از وب‌سایت‌ها به‌دلیل طراحی غیراستاندارد یا گذشت زمان،
                نیازمند بازطراحی یا به‌روزرسانی هستند. ما وب‌سایت شما را در دو
                سطح اساسی بهینه می‌کنیم:
              </p>
              <ul className="space-y-2">
                <li>
                  <strong>بهینه‌سازی فنی:</strong> افزایش سرعت، بهبود امنیت،
                  ارتقای عملکرد و اصلاح ساختار کدنویسی.
                </li>
                <li>
                  <strong>بهینه‌سازی محتوایی:</strong> ارتقای کیفیت متن و
                  تصاویر، ساختاردهی اصولی، بهبود سئو و تقویت تجربه کاربری.
                </li>
              </ul>
              <p>
                هدف ما این است که وب‌سایت شما هم روان و کاربرپسند باشد و هم در
                نتایج گوگل بهترین عملکرد را داشته باشد.
              </p>
              <p>
                اگر از وضعیت فعلی وب‌سایت خود راضی نیستید یا بازخورد منفی از
                مشتریان دریافت کردید، ما می‌توانیم شرایط وب‌سایت شما را به‌طور
                کامل بررسی کرده و راهکار مناسب ارائه کنیم.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواست بـررسی وب‌سـایـت
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-23" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              پشتیبانی و نگهداری وب‌سایت
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>
                شاید در ظاهر موضوعی ساده و کم‌اهمیت به نظر برسد، اما تجربه ما
                نشان می‌دهد بسیاری از کسب‌وکارها تنها به‌دلیل نداشتن یک سرویس
                پشتیبانی مناسب — که هزینه چندانی هم ندارد — با خسارات جدی مواجه
                شده‌اند؛ از دسترس خارج شدن وب‌سایت، از بین رفتن اطلاعات مهم، یا
                حتی از دست دادن نام دامنه‌ای که ارزش بالایی برای کسب‌وکار داشته
                است.
              </p>
              <p>
                با سرعت رشد تکنولوژی و تغییر مداوم نسخه‌های نرم‌افزاری، نیاز به
                به‌روزرسانی فنی کدها و مدیریت هوشمندانه سرویس‌های میزبانی بیش از
                هر زمان دیگری اهمیت دارد. یک وب‌سایت حرفه‌ای برای حفظ عملکرد
                پایدار و جلوگیری از آسیب‌های احتمالی، به نظارت و مدیریت یک متخصص
                نیاز دارد تا به‌صورت مستمر موارد زیر را انجام دهد:
              </p>

              <ul className="mb-4 list-disc space-y-1.5 pr-8 font-semibold">
                <li>پایش عملکرد فنی سایت</li>
                <li>مدیریت هاست و سرور</li>
                <li>کنترل امنیت و به‌روزرسانی‌ها</li>
                <li>انجام بکاپ‌گیری منظم</li>
                <li>جلوگیری از هزینه‌های غیرضروری</li>
              </ul>
              <p>
                ما علاوه بر این موارد، مدیریت دامنه، تمدیدها، تنظیمات امنیتی،
                مدیریت رمزها و هر چیزی را که برای سلامت وب‌سایت شما ضروری است،
                را برعهده می‌گیریم. مسائلی که ظاهر ساده‌ای دارند اما در عمل
                دردسرها و هزینه‌های زیادی را برای صاحبان کسب‌وکار ایجاد می‌کنند.
              </p>
              <p>
                با سرویس پشتیبانی و نگهداری حرفه‌ای کوچا، می‌توانید مطمئن باشید
                وب‌سایت‌تان همیشه پایدار، امن و آماده خدمت‌رسانی به مشتریان است.
              </p>
              <Button className="mt-3 w-full" asChild>
                <Link href={"https:/t.me/koochaa_support"} target="_blank">
                  درخـواسـت مـشـاوره
                </Link>
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 className="text-secondary mt-8 mb-4 flex flex-col items-center gap-1 text-lg font-bold">
          <BriefcaseIcon weight="duotone" size={40} /> توسعه کـسـب و کـار
        </h2>

        <Accordion type="single" collapsible className="accordion-bc w-full">
          <AccordionItem value="ac-31" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              مشاوره و کوچینگ مدیران
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-32" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              طراحی ساختار داده و هوش تجاری
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ac-33" className="ac-item">
            <AccordionTrigger className="ac-trigger">
              اتوماسیون و ابزارهای هوش مصنوعی
            </AccordionTrigger>
            <AccordionContent className="ac-content">
              <p>بزودی...</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
