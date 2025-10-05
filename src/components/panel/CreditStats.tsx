import { usePointsStore } from "@/store/usePointsStore";
import { MedalIcon } from "@phosphor-icons/react";
import { Medal } from "lucide-react";
import Image from "next/image";

export const CreditStats = () => {
  const { points } = usePointsStore();

  return (
    <section>
      <div className="mb-5 rounded-xl border border-blue-200 bg-blue-100 p-2">
        <div className="flex flex-col justify-center rounded-lg bg-white/90 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="font-medium text-blue-800">جـمـع امـتـیـاز</div>
              <div className="flex items-center gap-1 font-medium">
                <MedalIcon
                  size={18}
                  weight="duotone"
                  className="text-yellow-700/70"
                />
                <span className="text-[13px] text-yellow-700/80">عضویت بـرنـزی</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-amber-300 text-shadow-2xs text-shadow-amber-900">
                {points}
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
      </div>
    </section>
  );
};
