// src/app/(Site)/layout/dialogCountry.tsx
"use client";

import { MODAL } from "@/text/modal";
import { Country } from "@/types/country";
import { CircleFlag } from "next-circle-flags";
import Link from "next/link";
import { useRef } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DialogCountryProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  countries: Country[];
};

export const DialogCountry = ({
  open,
  setOpen,
  countries,
}: DialogCountryProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-h-[90vh] gap-5 overflow-y-auto p-5"
        showCloseButton={false}
      >
        <form method="dialog">
          <DialogHeader className="gap-5">
            <DialogTitle className="text-[15px] font-normal text-gray-500">
              {MODAL.COUNTRY_TITLE}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="grid grid-cols-4 gap-5">
                {countries?.map((country) => {
                  return (
                    <Link
                      key={country.id}
                      href={`/${country.code}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-2"
                    >
                      <CircleFlag
                        width={44}
                        height={44}
                        countryCode={country.code}
                        alt={country.name}
                        title={country.name}
                      />
                      <p className="text-[13px]">{country.name}</p>
                    </Link>
                  );
                })}
              </div>
            </DialogDescription>
          </DialogHeader>
        </form>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              انصراف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
