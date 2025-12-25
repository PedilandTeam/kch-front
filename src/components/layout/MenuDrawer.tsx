"use client";

import type { Country } from "@/schemas";
import { FOOTER, GENERAL, MENU } from "@/text";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  VisuallyHidden,
} from "@/components/ui";
import {
  BriefcaseIcon,
  InstagramLogoIcon,
  ListIcon,
  NewspaperClippingIcon,
  ScalesIcon,
  StethoscopeIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

interface MenuDrawerProps {
  countryCode: string;
  countries?: Country[];
}

export const MenuDrawer = ({ countryCode, countries }: MenuDrawerProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentCountry = countries?.find(
    (c: Country) => c.code === countryCode,
  );

  const menuItems = [
    {
      title: "بیزینس سنتر (خدمات کسب و کار)",
      icon: <BriefcaseIcon weight="duotone" className="text-secondary" />,
      href: "/business-center",
      country: false,
    },
    {
      title: "ارسال هدفمند آگهی (Ads Club)",
      icon: (
        <NewspaperClippingIcon weight="duotone" className="text-secondary" />
      ),
      href: "/adsclub",
      country: false,
    },
    {
      title: `لیست پزشکان ایرانی ${currentCountry?.name}`,
      icon: <StethoscopeIcon weight="duotone" className="text-secondary" />,
      href: `/${countryCode}/doctors`,
      country: true,
    },
    {
      title: `لیست وکلای ایرانی ${currentCountry?.name}`,
      icon: <ScalesIcon weight="duotone" className="text-secondary" />,
      href: `/${countryCode}/lawyers`,
      country: true,
    },
    {
      title: `لیست مشاغل ایرانی ${currentCountry?.name}`,
      icon: <StorefrontIcon weight="duotone" className="text-secondary" />,
      href: `/${countryCode}/businesses`,
      country: true,
    },
  ];

  const filteredMenuItems = currentCountry
    ? menuItems
    : menuItems.filter((item) => item.country === false);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      scrollPositionRef.current = window.scrollY;
      setOpen(true);
    } else {
      setOpen(false);

      if (buttonRef.current) {
        buttonRef.current.blur();
      }

      setTimeout(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: "instant",
        });
      }, 0);
    }
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <button
          ref={buttonRef}
          type="button"
          aria-label="Open menu"
          className="flex cursor-pointer items-center justify-center focus:outline-none"
          tabIndex={open ? -1 : 0}
          onClick={() => {
            if (buttonRef.current) {
              buttonRef.current.blur();
            }
          }}
          suppressHydrationWarning
        >
          <ListIcon size={34} weight="duotone" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-primary mx-auto rounded-t-3xl border-none md:max-w-[414px]">
        <DrawerHeader className="p-0">
          <DrawerTitle>
            <VisuallyHidden>Menu</VisuallyHidden>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="space-y-7 p-5 pb-8">
          <div className="flex justify-center">
            <Image
              className="h-auto w-[180px]"
              src={"/images/logo-white.svg"}
              width={180}
              height={50}
              alt="Koochaa Logo in white color"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start gap-2">
              {filteredMenuItems.map((item) => (
                <Button
                  variant="ghost"
                  className="h-10 w-auto gap-3 text-base font-bold text-white [&_svg:not([class*='size-'])]:size-6.5"
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  <h2>{item.title}</h2>
                </Button>
              ))}
            </div>
          </div>

          <Link
            href={"https://www.instagram.com/_koochaa"}
            target="_blank"
            className="flex justify-center"
          >
            <Card className="rounded-full border-2 border-white/50 bg-white/20">
              <CardContent className="flex items-center justify-center gap-2 px-5 py-2.5">
                <div>
                  <InstagramLogoIcon size={28} className="text-white" />
                </div>
                <div className="text-white">
                  کـوچـا رو در اینستاگرام دنبال کنید.
                </div>
              </CardContent>
            </Card>
          </Link>

          <div className="_copyright space-y-2.5 text-center">
            <div className="flex items-center justify-center gap-6 text-[15px] font-light text-white">
              <Link href={"/about"} scroll={false}>
                {MENU.ABOUT}
              </Link>
              <Link href={"/terms"}>{MENU.TERMS_AND_CONDITIONS}</Link>
              <Link href={"/contact"}>{MENU.CONTACT_US}</Link>
            </div>

            <p className="text-xs font-light text-white/70">
              {FOOTER.COPYRIGHT_TEXT1}
              <Link href="/" className="mx-1 inline-flex">
                {GENERAL.KOOCHAA}
              </Link>
              {FOOTER.COPYRIGHT_TEXT2}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
