import { SquareButton } from "../ui-custom/SquareButton";

export const CardsMenu = () => {
  return (
    <section>
      <div className="flex flex-col gap-3">
        {/* <SquareButton icon={"ListHeartIcon"} link="/panel/adsclub/bookmarks">
          لیست علاقه‌مندی‌ها
        </SquareButton> */}
        <SquareButton icon={"ListHeartIcon"} link="/panel/adsclub/bookmarks">
          دعوت از دوستان (50+ امتیاز)
        </SquareButton>
        <SquareButton icon={"ListHeartIcon"} link="/panel/adsclub/bookmarks">
          سیستم امتیازدهی
        </SquareButton>
        <SquareButton icon={"UserListIcon"} link="/panel/profile">
          مدیریت دسته بندی‌ها
        </SquareButton>

        <SquareButton icon={"UserListIcon"} link="/panel/profile">
          حساب کاربری
        </SquareButton>
      </div>
    </section>
  );
};
