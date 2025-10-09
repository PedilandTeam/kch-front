"use client";

import { useState } from "react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/index";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const frameworks = [
  { value: "germany", label: "آلمان" },
  { value: "spain", label: "اسپانیا" },
  { value: "italy", label: "ایتالیا" },
  { value: "france", label: "فرانسه" },
  { value: "canada", label: "کانادا" },
];

interface SelectSearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const SelectSearch = ({ value, onValueChange }: SelectSearchProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const normalize = (str: string) =>
    str.replace(/[ي]/g, "ی").replace(/[ك]/g, "ک").trim();

  const filtered = frameworks.filter((item) =>
    normalize(item.label).includes(normalize(search)),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks.find((item) => item.value === value)?.label
            : "انتخاب کنید"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="جستجو..."
            value={search}
            onValueChange={setSearch}
            className="h-10"
          />

          <CommandList>
            {filtered.length === 0 ? (
              <CommandEmpty>نتیجه‌ای یافت نشد</CommandEmpty>
            ) : (
              <CommandGroup>
                {filtered.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      onValueChange(framework.value);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "mr-auto",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
