import { GENERAL } from "@/text";
import type { Page } from "@/types/page";
import DeviceDetector from "device-detector-js";
import type { MouseEvent } from "react";
import { toast } from "sonner";

interface UseLinkHandlerProps {
  pageData: Page;
}

export const useLinkHandler = ({ pageData }: UseLinkHandlerProps) => {
  const linkHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.dataset.type;
    const detector = new DeviceDetector();
    const agent = detector.parse(navigator.userAgent);
    const regexp =
      /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/gim.exec(
        pageData?.socials?.website!,
      );
    if (!regexp || !Array.isArray(regexp) || !regexp[1]) {
      return;
    }

    switch (type) {
      case "website":
        window.open(`https://${regexp[0]}`, "_blank", "noopener, noreferrer");
        break;
      case "telegram":
        window.open(
          `https://t.me/${pageData.contact?.telegram}`,
          "_blank",
          "noopener, noreferrer",
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/00${
            pageData.country.areaCode ? pageData.country.areaCode : ""
          }${pageData.contact.whatsapp!}`,
          "_blank",
          "noopener, noreferrer",
        );
        break;
      case "telephone":
        if (agent.device?.type == "desktop") {
          const number = `00${
            pageData.country.areaCode ? pageData.country.areaCode : ""
          }${pageData.contact?.telephone!}`;
          navigator.clipboard.writeText(number);
          e.currentTarget.dataset.tip = number;
          toast.success(GENERAL.PHONE_COPIED);
        } else {
          window.open(
            `tel:${pageData.contact?.telephone}`,
            "_blank",
            "noopener, noreferrer",
          );
        }
        break;
      case "phone":
        if (agent.device?.type == "desktop") {
          const number = `00${
            pageData.country.areaCode ? pageData.country.areaCode : ""
          }${pageData.contact.phone!}`;
          navigator.clipboard.writeText(number);
          e.currentTarget.dataset.tip = number;
          toast.success(GENERAL.PHONE_COPIED);
        } else {
          window.open(
            `tel:${pageData.contact.phone}`,
            "_blank",
            "noopener, noreferrer",
          );
        }
        break;
      default:
        break;
    }
  };

  const shareHandler = async () => {
    const url = `${process.env.NEXT_PUBLIC_FRONT_URL}/${pageData.slug}`;

    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success(GENERAL.URL_COPIED);
    }
  };

  return { linkHandler, shareHandler };
};
