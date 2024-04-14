import { ShieldCheck } from "app/client-packages/phosphor-icons/react";
import { BadgesProps } from "./badges";
import { FC } from "react";

const BlueBadge: FC<BadgesProps> = ({ enable }) => {
  if (enable)
    return (
      <ShieldCheck
        size={30}
        weight="duotone"
        className="transition duration-300 text-sky-600 hover:cursor-pointer hover:text-slate-800"
        onClick={() => {
          if (document) {
            (
              document.getElementById("blue_modal") as HTMLFormElement
            ).showModal();
          }
        }}
      />
    );
};

export default BlueBadge