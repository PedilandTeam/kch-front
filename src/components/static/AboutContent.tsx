import {
  BankIcon,
  PeaceIcon,
  ShieldIcon,
  TrophyIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "../ui";

export const AboutContent = () => {
  return (
    <section className="_about content">
      <div className="section">
        <h2>
          کـوچـا،
          <br />
          تلاشی برای افزایش کیفیت زندگی ایرانیان مهاجر
        </h2>
        <p>
          در چند دهه گذشته بواسطه شرایط نامساعد زندگی در ایران تعداد زیادی از
          هم‌وطنان عزیزمون مجبور به ترک سرزمین مادری‌شون شدن و واژه مهاجرت به
          بخش جداناپذیری از دغدغه‌های روزمره مردم این منطقه تبدیل شده.
        </p>
        <p>
          رشد بی‌سابقه نرخ مهاجرت در دو دهه اخیر چالش‌های گوناگونی رو در زندگی
          مهاجران و اطرافیان اونها ایجاد کرده. اما متاسفانه خدمات و راهکارهای
          قابل قبول به تناسب افزایش این نیازها ارائه نشده و این موضوع فرصت
          مناسبی رو برای افراد سودجو فراهم کرده تا بتونن براحتی از شرایط سخت
          هم‌وطنان‌مون سواستفاده کنن.
        </p>
        <p>
          مهاجرت در سنین بالا، ارزش پایین واحد پول نسبت به ارز کشور مقصد، افزایش
          و سهولت فرصت‌های مهاجرتی به کشورهای غیرانگلیسی زبان، عدم داشتن
          مهارت‌های کافی برای تطبیق با جامعه جدید، مهاجرت‌های خانوادگی
          غیرهمزمان، معضل پناهندگی و ده‌ها دلیل دیگه باعث شده تا طیف نسبتا زیادی
          از مهاجران کیفیت مطلوب زندگی که در هنگام ترک وطن انتظارش رو داشتند
          تجربه نکنن!
        </p>
      </div>

      <div className="section">
        <h2>اقدام ما!</h2>
        <p>
          ما جمعی از متخصصان حوزه تکنولوژی هستیم که جمعا نزدیک به 3 دهه تجربه
          مهاجرت در 5 کشور مختلف رو داریم و عمیقا با مشکلات و مسائل ایرانیان
          مهاجر آشنا هستیم.
        </p>
        <p>
          ما تصمیم گرفتیم به پشتوانه تخصص و تجربه‌مون یک راهکار کاربردی و
          استاندارد برای چالش‌های ایرانیان مهاجر ایجاد کنیم تا علاوه بر سهولت
          مسیر پرفراز و نشیب مهاجرت، گام موثری در افزایش کیفیت زندگی شما عزیزان
          برداریم. ما اعتقاد داریم جامعه ایرانی مهاجر نیاز داره با اتحاد و همدلی
          افرادی که دغدغه مشترک دارن جایگاه شایسته خودش در جامعه جهانی رو بدست
          بیاره و فرهنگ و ارزش‌های غنی خودش رو با جامعه جدیدی که در اون زندگی
          می‌کنه به اشتراک بذاره.
        </p>
        <p>
          کـوچـا نتیجه اقدام و اراده ما در راستای کمک به رفع نیازهای ایرانیان
          مهاجره. میدونیم که راه طولانی و دشواری در پیش داریم اما به همراهی و
          حمایت شما عزیزان امید داریم!
        </p>
      </div>

      <div className="section">
        <h2>هدف ما!</h2>
        <p>هدف اصلی ما افزایش کیفیت و سهولت زندگی ایرانیان مهاجره!</p>
        <p>
          این کیفیت شاخص‌های متفاوتی داره که مهمترین اونها میتونه تطبیق‌پذیری
          سریع و کم هزینه با جامعه مقصد، به دست آوردن جایگاه اجتماعی، پیدا کردن
          جمع‌های دوستانه محلی و کسب درآمد قابل قبول باشه که ما برای اکثر این
          موارد برنامه و هدفی داریم.
        </p>
        <ul>
          <li>
            <span className="text-secondary font-semibold">
              1. راهنمای مشاغل:
            </span>{" "}
            یک دایرکتوری حرفه‌ای برای معرفی و رتبه‌بندی مشاغل و پزشکان ایرانی
          </li>
          <li>
            <span className="text-secondary font-semibold">
              2. بیزینس سنتر:
            </span>{" "}
            یک پلتفرم حرفه‌ای برای ارائه خدمات جامع کسب و کار به صاحبین مشاغل و
            پزشکان
          </li>
          <li>
            <span className="text-secondary font-semibold">
              3. نیازمندی‌ها:
            </span>{" "}
            یک ساختار استاندارد برای ثبت آگهی‌های دسته‌بندی‌شده (بـزودی)
          </li>
        </ul>
        <p>
          البته امکانات و خدمات کـوچـا به اینجا ختم نمیشه و در آینده نزدیک
          برنامه‌هامون رو باهاتون در میون میذاریم.
        </p>
      </div>

      <div className="section">
        <h2>ارزش های ما!</h2>
        <div className="space-y-3">
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 text-center shadow-none">
            <CardContent className="space-y-2 p-5">
              <ShieldIcon
                size={40}
                weight="duotone"
                className="text-secondary mx-auto"
              />
              <h3 className="text-primary font-semibold">حفظ حریم شخصی</h3>
              <p className="text-muted-foreground">
                ما به حریم شخصی مخاطبامون احترام می‌ذاریم و تمام تلاش‌مون رو
                برای ایجاد امنیت اطلاعات‌شون به کار می‌گیریم.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 text-center shadow-none">
            <CardContent className="space-y-2 p-5">
              <TrophyIcon
                size={40}
                weight="duotone"
                className="text-secondary mx-auto"
              />
              <h3 className="text-primary font-semibold">
                ارتباط برنده - برنده
              </h3>
              <p className="text-muted-foreground">
                ما عمیقا اعتقاد داریم که رمز تعاملات سازنده و پایدار در ایجاد
                منافع مشترک و برنده‌بودن ذی‌نفعان است.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 text-center shadow-none">
            <CardContent className="space-y-2 p-5">
              <BankIcon
                size={40}
                weight="duotone"
                className="text-secondary mx-auto"
              />
              <h3 className="text-primary font-semibold">سیاست بی سیاست</h3>
              <p className="text-muted-foreground">
                ما هیچ گرایش سیاسی نداریم؛ چون برخلاف سیاست، ما برای تک تک
                مخاطبامون ارزش قائلیم.
              </p>
            </CardContent>
          </Card>
          <Card className="border-dashed border-blue-300/70 bg-blue-50/50 text-center shadow-none">
            <CardContent className="space-y-2 p-5">
              <PeaceIcon
                size={40}
                weight="duotone"
                className="text-secondary mx-auto"
              />
              <h3 className="text-primary font-semibold">استقلال، آزادی</h3>
              <p className="text-muted-foreground">
                ما به هیچ ارگان غیرمردمی وابسته نیستیم و نخواهیم بود تا بتونیم
                آزادانه در راستای تحقق رویامون قدم برداریم.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
