import Image from "next/image";

export const HomeHeader = () => {
  return (
    <header className="flex items-center gap-3 space-y-1 px-4 pt-4">
      <div>
        <Image src="/images/logo-01.png" alt="logo" width={44} height={44} />
      </div>
      <div>
        <div className="text-[13px] text-gray-500">سـلام، پدرام عـزیـز</div>
        <div className="font-semibold text-blue-900">خـوش آمـدیـد!</div>
      </div>
    </header>
  );
};
