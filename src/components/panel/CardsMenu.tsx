import { SquareButton } from "../ui-custom/SquareButton";

export const CardsMenu = () => {
  return (
    <section className="px-4">
      <div className="grid grid-cols-3 gap-2">
        <SquareButton
          icon={"ListMagnifyingGlassIcon"}
          link="/panel/adsclub/explore"
        >
          اکـسـپـلـور
        </SquareButton>
        <SquareButton icon={"ListHeartIcon"} link="/panel/adsclub/bookmarks">
          علاقه‌مندی‌ها
        </SquareButton>
        <SquareButton icon={"UserListIcon"} link="/panel/profile">
          حساب کاربری
        </SquareButton>
      </div>
    </section>
  );
};
