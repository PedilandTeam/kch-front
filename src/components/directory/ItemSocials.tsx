import { cn } from "@/lib/utils";
import type { Page } from "@/types/page";
import Link from "next/link";

import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  ShareNetworkIcon,
  TelegramLogoIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

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

  return (
    <div className="_item-socials flex justify-center">
      <div className="flex justify-center gap-5 rounded-full border-2 border-gray-200/60 bg-white/75 p-2 px-6">
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

        <ShareNetworkIcon
          size={30}
          weight="light"
          className="text-yellow-800 transition duration-300 hover:text-black"
        />
      </div>
    </div>
  );
};
