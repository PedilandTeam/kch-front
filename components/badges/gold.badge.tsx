import { FC } from "react";
import { BadgesProps } from "./badges";
import { ShieldCheck } from "@phosphor-icons/react";

const GoldBadge: FC<BadgesProps> = ({ enable }) => {
  if (enable)
    return (
      <ShieldCheck
        size={30}
        weight="duotone"
        className="text-yellow-600 transition duration-300 hover:cursor-pointer hover:text-slate-800"
        onClick={() => {
          if (document) {
            (
              document.getElementById("gold_modal") as HTMLFormElement
            ).showModal();
          }
        }}
      />
    );
};

export default GoldBadge;
