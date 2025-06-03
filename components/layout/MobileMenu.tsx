// components/layout/MobileMenu.tsx
import Image from "next/image";

export const MobileMenu = () => {
  return (
    <div className="fixed right-0 bottom-2 left-0 mx-2 flex h-14 items-center justify-center rounded-full border bg-white shadow-lg">
      <div className="_logo rounded-full bg-white p-2.5 shadow-md">
        <Image
          src="/images/logo-symbol.svg"
          width={46}
          height={46}
          alt="Koochaa Logo symbol"
        />
      </div>
    </div>
  );
};
