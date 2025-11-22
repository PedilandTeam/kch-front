import { cn } from "@/lib/utils";
import type { Page } from "@/types/page";
import Link from "next/link";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  TelegramLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ITEM } from "@/text";

interface ItemSocialsProps {
  pageData: Page;
}

export const ItemSocials = ({ pageData }: ItemSocialsProps) => {
  const socials = [
    {
      name: "instagram",
      url: (username: string) => `https://www.instagram.com/${username}`,
      icon: InstagramLogoIcon,
      color: "text-pink-600",
    },
    {
      name: "facebook",
      url: (username: string) => `https://www.facebook.com/${username}`,
      icon: FacebookLogoIcon,
      color: "text-sky-700",
    },
    {
      name: "youtube",
      url: (username: string) => `https://www.youtube.com/${username}`,
      icon: YoutubeLogoIcon,
      color: "text-red-600",
    },
    {
      name: "telegram",
      url: (username: string) => `https://t.me/${username}`,
      icon: TelegramLogoIcon,
      color: "text-sky-600",
    },
    {
      name: "x",
      url: (username: string) => `https://twitter.com/${username}`,
      icon: XLogoIcon,
      color: "text-black",
    },
    {
      name: "linkedin",
      url: (username: string) => `https://www.linkedin.com/in/${username}`,
      icon: LinkedinLogoIcon,
      color: "text-sky-700",
    },
  ];

  console.log("Page Data...", pageData);

  const haveSocial = pageData.socials
    ? Object.entries(pageData.socials)
        .filter(([key]) => key !== "website")
        .some(([_, value]) => value && value.trim() !== "")
    : false;

  return (
    <div className="_item-socials mx-5 flex justify-center border-b border-dashed pb-3">
      {haveSocial ? (
        <div className="flex justify-center gap-5">
          {socials.map(({ name, url, icon: Icon, color }) => {
            const username =
              pageData.socials?.[name as keyof typeof pageData.socials];

            if (!username) return null;

            return (
              <Link
                key={name}
                href={url(username)}
                target="_blank"
                rel="nofollow noopener"
              >
                <Icon
                  size={30}
                  weight="light"
                  className={cn(
                    "transition duration-300 hover:text-black",
                    color,
                  )}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">{ITEM.NO_SOCIAL_MEDIA}</p>
      )}
    </div>
  );
};
