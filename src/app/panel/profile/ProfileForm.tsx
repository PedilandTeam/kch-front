"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { adsClubRegisterSchema } from "@/schemas/adsClubRegister";

import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/index";
import { SelectSearch } from "@/components/ui-custom/SelectSearch";

type AdsClubRegister = z.infer<typeof adsClubRegisterSchema>;

export default function ProfileForm() {
  const form = useForm<AdsClubRegister>({
    resolver: zodResolver(adsClubRegisterSchema),
    defaultValues: {
      status: "migrated",
      gender: "male",
      birthYear: "1990",
      country: "Germany",
      city: "Berlin",
      interests: ["tech", "art"],
      destinations: [],
      methods: [],
    },
  });

  const watchStatus = form.watch("status");

  const onSubmit = (values: AdsClubRegister) => {
    console.log("Updated profile:", values);
  };

  return (
    <Form {...form}>
      <Card className="border-blue-500/20 bg-blue-50/50 p-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="status">وضعیت مهاجرت:</FormLabel>
                <FormControl>
                  <RadioGroup
                    dir="rtl"
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="migrated" id="migrated" />
                      <label htmlFor="migrated" className="text-sm">
                        مهاجرت کردم
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="migrating" id="migrating" />
                      <label htmlFor="migrating" className="text-sm">
                        در حال مهاجرت هستم
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="gender">جنسیت:</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  dir="rtl"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">مرد</SelectItem>
                    <SelectItem value="female">زن</SelectItem>
                    <SelectItem value="other">سایر</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>سال تولد (میلادی):</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="مثال: 1990"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchStatus === "migrated" && (
            <>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کشور محل زندگی:</FormLabel>
                    <FormControl>
                      <SelectSearch
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شهر محل زندگی:</FormLabel>
                    <FormControl>
                      <SelectSearch
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {watchStatus === "migrating" && (
            <>
              <FormField
                control={form.control}
                name="destinations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مقاصد مهاجرت:</FormLabel>
                    <FormControl>
                      <SelectSearch
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="methods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>روش‌های مهاجرت:</FormLabel>
                    <FormControl>
                      <SelectSearch
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="mt-2">
            <Button type="submit" className="w-full">
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
}
