"use client";

import { MODAL } from "@/text/modal";
import { Country } from "@/schemas/country";
import { CircleFlag } from "next-circle-flags";
import Link from "next/link";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components";

type CountriesDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  countries: Country[];
};

export const CountriesDialog = ({
  open,
  setOpen,
  countries,
}: CountriesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        dir="rtl"
        className="max-h-[90vh] gap-5 overflow-y-auto p-5"
        showCloseButton={false}
      >
        <form method="dialog">
          <DialogHeader className="gap-5">
            <DialogTitle className="text-center text-[15px] font-normal text-gray-500">
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

        <DialogFooter className="sm:justify-center">
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
