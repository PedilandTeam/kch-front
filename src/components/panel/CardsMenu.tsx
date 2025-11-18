import { SquareButton } from "../ui-custom/SquareButton";

export const CardsMenu = () => {
  return (
    <section>
      <div className="flex flex-col gap-2.5">
        {/* <SquareButton icon={"ListHeartIcon"} link="/panel/adsclub/bookmarks">
          لیست علاقه‌مندی‌ها
        </SquareButton> */}
        {/* <SquareButton icon={"CheersIcon"} link="/panel/adsclub/invite">
          دعوت از دوستان (50+ امتیاز)
        </SquareButton> */}
        <SquareButton icon={"CoinsIcon"} link="/panel/adsclub/scores">
          سیستم امتیازات
        </SquareButton>
        <SquareButton
          icon={"FolderSimpleStarIcon"}
          link="/panel/adsclub/interests"
        >
          مدیریت علاقه‌مندی‌ها
        </SquareButton>
        <SquareButton icon={"UserListIcon"} link="/panel/profile">
          حساب کاربری
        </SquareButton>
        <SquareButton icon={"LifebuoyIcon"} link="https://t.me/koochaa_support">
          تماس با پشتیبانی
        </SquareButton>
      </div>
    </section>
  );
};
