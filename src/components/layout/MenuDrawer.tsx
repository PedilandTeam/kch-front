"use client";

import { useState, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components";
import { ListIcon } from "@phosphor-icons/react";

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
          behavior: 'instant'
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
          className="flex items-center justify-center focus:outline-none"
          tabIndex={open ? -1 : 0}
          onClick={() => {
            // Immediately blur to prevent focus retention
            if (buttonRef.current) {
              buttonRef.current.blur();
            }
          }}
          suppressHydrationWarning
        >
          <ListIcon size={32} weight="duotone" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>
            Navigate through the application
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
