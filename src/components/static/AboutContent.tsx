import {
  BankIcon,
  PeaceIcon,
  SealCheckIcon,
  ShieldIcon,
  SignpostIcon,
  TrophyIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "../ui";

export const AboutContent = () => {
  return (
    <section className="_about content">
      <div className="section">
        <h2>
          کـوچـا، تلاشی برای افزایش کیفیت زندگی ایرانیان مهاجر مقیم همه‌جاست.
        </h2>
        <p>
          در دهه‌های اخیر به‌دلیل شرایط دشوار زندگی در ایران، بخش بزرگی از
          هم‌وطنان ناچار به ترک خانه و سرزمین خود شده‌اند و «مهاجرت» به یکی از
          جدی‌ترین دغدغه‌های امروز جامعه ایران تبدیل شده است.
        </p>
        <p>
          رشد بی‌سابقه مهاجرت در سال‌های اخیر، چالش‌های فراوانی را برای مهاجران
          و خانواده‌هایشان ایجاد کرده؛ اما در مقابل، خدمات مناسب و استاندارد
          چندان توسعه پیدا نکرده‌اند. همین خلا باعث شده بسیاری از مهاجران در
          معرض سواستفاده افراد فرصت‌طلب قرار بگیرند و دچار خسارت و سردرگمی شوند.
        </p>
        <p>
          مهاجرت در سنین بالا، اختلاف ارزش پول ایران با کشورهای مقصد، افزایش
          فرصت‌های مهاجرتی به کشورهای غیرانگلیسی‌زبان، کمبود مهارت‌های لازم برای
          تطبیق، مهاجرت‌های خانوادگی غیرهم‌زمان، پناهندگی و ده‌ها عامل دیگر
          دست‌به‌دست هم داده تا بسیاری از مهاجران نتوانند کیفیت زندگی‌ای را که
          هنگام ترک وطن انتظارش را داشتند تجربه کنند.
        </p>
      </div>

      <div className="section">
        <h2 className="flex items-center gap-1">
          <SealCheckIcon
            weight="duotone"
            size={18}
            className="text-yellow-600"
          />
          ما کی هستیم؟
        </h2>
        <p>
          ما گروهی از متخصصان حوزه فناوری و بازاریابی هستیم که مجموعا نزدیک به
          سه دهه تجربه زندگی و مهاجرت در پنج کشور مختلف را داریم. ما عمیقا
          چالش‌های زندگی ایرانیان مهاجر را درک می‌کنیم.
        </p>
      </div>

      <div className="section">
        <h2 className="flex items-center gap-1">
          <SealCheckIcon
            weight="duotone"
            size={18}
            className="text-yellow-600"
          />
          هدف ما چیه؟
        </h2>
        <p>
          هدف ما ساده و روشنه:{" "}
          <strong>
            افزایش کیفیت زندگی ایرانیان مهاجر، در هر نقطه دنیا که هستند.
          </strong>
        </p>
        <p>
          این کیفیت در چند شاخص کلیدی معنا پیدا می‌کند؛ از تطبیق‌پذیری سریع و
          کم‌هزینه با جامعه مقصد گرفته تا دستیابی به جایگاه اجتماعی بهتر، پیدا
          کردن حس هویت و تعلق و در نهایت رسیدن به درآمد پایدار. ما برای هر کدام
          از این نیازها برنامه و مسیر مشخصی داریم.
        </p>
      </div>

      <div className="section">
        <h2 className="flex items-center gap-1">
          <SealCheckIcon
            weight="duotone"
            size={18}
            className="text-yellow-600"
          />
          اقدامات ما!
        </h2>
        <p>
          با تکیه بر تجربه و تخصص‌مان، تصمیم گرفتیم راهکارهایی ایجاد کنیم تا
          مسیر پرچالش مهاجرت را برای هم‌وطنان‌مان ساده‌تر کنیم و سهمی در بهبود
          کیفیت زندگی جامعه ایرانیان مهاجر داشته باشیم.
        </p>

        <ul>
          <p>
            <strong>راهکارهایی که تا این لحظه عملیاتی شدند:</strong>
          </p>
          <li>
            <span className="text-secondary font-semibold">
              1. بیزینس سنتر:
            </span>{" "}
            مجموعه خدمات حرفه‌ای کسب و کار برای صاحبین مشاغل و پزشکان ایرانی
          </li>
          <li>
            <span className="text-secondary font-semibold">
              2. راهنمای مشاغل:
            </span>{" "}
            دایرکتوری رایگان برای معرفی و دسترسی‌پذیری مشاغل و پزشکان ایرانی
          </li>

          <li>
            <span className="text-secondary font-semibold">3. Ads Club:</span>{" "}
            سیستم ارسال هدفمند آگهی مطابق با نیاز و منطقه جغرافیایی مخاطب
          </li>
        </ul>

        <p>
          ما به‌جای تمرکز بر یک کشور، انتخاب کردیم بر کیفیت خدمات و زیرساخت
          تمرکز کنیم و پلتفرمی یکپارچه برای تمام ایرانیان مهاجر در سراسر دنیا
          بسازیم. هدف ما این است که هم بهانه‌ای برای اتحاد و همدلی باشیم و هم از
          هدررفتن انگیزه‌ها و تلاش‌های پراکنده هموطنان دغدغه‌مند در شهرها و
          کشورهای مختلف جلوگیری کنیم. ما باور داریم با هم‌افزایی و تمرکز توان
          جمعی، می‌توانیم اثر بزرگ‌تری ایجاد کنیم.
        </p>
        <p>
          می‌دانیم که هدف نهایی ما دور و مسیر طولانی است، اما با همراهی و حمایت
          شما امیدوار و دلگرمیم.
        </p>
      </div>

      <div className="section">
        <h2 className="mb-2 flex items-center gap-1">
          <SealCheckIcon
            weight="duotone"
            size={18}
            className="text-yellow-600"
          />
          ارزش های ما!
        </h2>
        <div className="space-y-3">
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 shadow-none">
            <CardContent className="space-y-1 p-4">
              <div className="flex items-center gap-2">
                <ShieldIcon
                  size={30}
                  weight="duotone"
                  className="text-secondary"
                />
                <h3 className="text-primary font-semibold">حفظ حریم شخصی</h3>
              </div>
              <p className="text-muted-foreground">
                ما به حریم خصوصی کاربران احترام می‌گذاریم و امنیت اطلاعات را یک
                اصل غیرقابل‌مذاکره می‌دانیم.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 shadow-none">
            <CardContent className="space-y-1 p-4">
              <div className="flex items-center gap-2">
                <TrophyIcon
                  size={30}
                  weight="duotone"
                  className="text-secondary"
                />
                <h3 className="text-primary font-semibold">
                  تعامل برنده – برنده
                </h3>
              </div>
              <p className="text-muted-foreground">
                ما باور داریم که رمز تعاملات سازنده و پایدار در ایجاد منافع
                مشترک و برنده‌بودن ذی‌نفعان است.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 shadow-none">
            <CardContent className="space-y-1 p-4">
              <div className="flex items-center gap-2">
                <PeaceIcon
                  size={30}
                  weight="duotone"
                  className="text-secondary"
                />
                <h3 className="text-primary font-semibold">
                  استقلال و آزادی عمل
                </h3>
              </div>
              <p className="text-muted-foreground">
                ما به هیچ نهاد یا سازمان غیرمردمی وابسته نیستیم و استقلال‌مان را
                حفظ می‌کنیم تا بتوانیم آزادانه و شفاف در مسیر رویای خود حرکت
                کنیم.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
