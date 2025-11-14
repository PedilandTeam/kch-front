import { RichText } from "@/components/global/RichText";
import { cn } from "@/lib/utils";
import { ITEM } from "@/text";
import type { Page } from "@/types/page";

export const ItemDescription = ({ pageData }: { pageData: Page }) => {
  return (
    <div className="_description space-y-2 rounded-lg px-6 py-2 text-[15px]">
      <RichText
        className={cn({
          "text-center text-gray-500": !pageData.description,
        })}
        html={
          pageData.description
            ? pageData.description
            : ITEM.DESCRIPTION_PLACEHOLDER
        }
      />
    </div>
  );
};
