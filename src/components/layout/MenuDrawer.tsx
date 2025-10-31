"use client";

import { useState, useRef } from "react";
import {
  Button,
  Card,
  CardContent,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  VisuallyHidden,
} from "@components";
import { ListIcon } from "@phosphor-icons/react";
import { FOOTER, GENERAL, MENU } from "@/text";
import Link from "next/link";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export const MenuDrawer = () => {
  const [open, setOpen] = useState(false);
  const scrollPositionRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Save scroll position when opening
      scrollPositionRef.current = window.scrollY;
      setOpen(true);
    } else {
      // Close drawer and prevent focus/scroll issues
      setOpen(false);

      // Blur the button to prevent focus-related aria-hidden conflict
      if (buttonRef.current) {
        buttonRef.current.blur();
      }

      // Restore scroll position
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
          <ListIcon size={32} weight="duotone" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-t from-primary to-primary/80 mx-auto rounded-t-3xl border-none md:max-w-[414px]">
        <DrawerHeader className="p-0">
          <DrawerTitle>
            <VisuallyHidden>Menu</VisuallyHidden>
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="space-y-7 p-5">
          <div className="flex justify-center">
            <Image
              className="h-auto w-[180px]"
              src={"/images/logo-white.svg"}
              width={180}
              height={50}
              alt="Koochaa Logo in white color"
            />
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
            <div className="flex items-center justify-center gap-6 text-[15px] text-white">
              <Link href={"/about"} className="">
                {MENU.ABOUT}
              </Link>
              <Link href={"/terms"} className="">
                {MENU.TERMS_AND_CONDITIONS}
              </Link>
              <Link href={"/contact"} className="">
                {MENU.CONTACT_US}
              </Link>
            </div>

            <p className="text-[13px] text-white/70">
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
