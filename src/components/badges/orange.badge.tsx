import { ShieldWarningIcon } from "@phosphor-icons/react/dist/ssr";
import { BadgesProps } from "./badges";
import { FC, useMemo } from "react";

const OrangeBadge: FC<BadgesProps> = ({ enable, absoluteMode = false }) => {
  const className = useMemo(() => {
    return absoluteMode
      ? "absolute transition duration-300 text-stone-300 group-hover:text-orange-400 top-4 right-4"
      : "text-orange-400 transition duration-300 hover:cursor-pointer hover:text-slate-800";
  }, [absoluteMode]);

  return enable ? (
    <ShieldWarningIcon
      size={30}
      className={className}
      weight="duotone"
      onClick={() => {
        if (document) {
          (
            document.getElementById("orange_modal") as HTMLFormElement
          ).showModal();
        }
      }}
    />
  ) : null;
};

export default OrangeBadge;
