import { ShieldCheckIcon } from "@phosphor-icons/react";
import { useMemo, type FC } from "react";
import type { BadgesProps } from "./badges";

const BlueBadge: FC<BadgesProps> = ({ enable, absoluteMode = false }) => {
  const className = useMemo(() => {
    return absoluteMode
      ? "absolute transition duration-300 text-stone-300 group-hover:text-blue-400 top-4 right-4"
      : "transition duration-300 text-sky-600 hover:cursor-pointer hover:text-slate-800";
  }, [absoluteMode]);

  return enable ? (
    <ShieldCheckIcon
      size={30}
      weight="duotone"
      className={className}
      onClick={() => {
        if (document) {
          (
            document.getElementById("blue_modal") as HTMLFormElement
          ).showModal();
        }
      }}
    />
  ) : null;
};

export default BlueBadge;
