import { ShieldWarning } from "@phosphor-icons/react";
import { BadgesProps } from "./badges";
import { FC } from "react";

const OrangeBadge: FC<BadgesProps> = ({ enable }) => {
  if (enable)
    return (
      <ShieldWarning
        size={30}
        className="text-orange-400 transition duration-300 hover:cursor-pointer hover:text-slate-800"
        weight="duotone"
        onClick={() => {
          if (document) {
            (
              document.getElementById("orange_modal") as HTMLFormElement
            ).showModal();
          }
        }}
      />
    );
};

export default OrangeBadge;
