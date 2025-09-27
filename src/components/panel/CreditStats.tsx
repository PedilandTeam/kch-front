import Image from "next/image";

export const CreditStats = () => {
  return (
    <section className="px-4">
      <div className="rounded-xl border border-blue-200 bg-blue-100 p-2">
        <div className="flex items-center justify-between rounded-lg bg-white/90 px-4 py-3">
          <p className="font-medium text-blue-800">مجموع اعتبار شما:</p>
          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold text-amber-300 text-shadow-2xs text-shadow-amber-900">
              54
            </p>
            <Image
              src="/images/icons/icon-coins-2.png"
              alt="credit"
              width={54}
              height={54}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
