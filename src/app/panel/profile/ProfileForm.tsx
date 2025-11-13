"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  MultiSelect,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import { CircleFlag } from "next-circle-flags";
import { useEffect, useState } from "react";
import type { City, Country } from "@/schemas";
import fetchCountry from "@/api/fetchCountry";
import fetchCities from "@/api/fetchCities";

type AdsClubRegister = z.infer<typeof adsClubSchema>;

export default function ProfileForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCountry().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const form = useForm<AdsClubRegister>({
    resolver: zodResolver(adsClubSchema),
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
                    <FormLabel>
                      <span className="text-red-500">*</span> کشور محل زندگی
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={(val) => {
                        field.onChange(val);
                        fetchCities({
                          countryCode: val,
                          limit: 1000,
                          page: 1,
                        }).then((res) => {
                          console.log(res);
                          setCities(res.items || []);
                          form.setValue("city", "");
                        });
                      }}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کشور..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={country.code}>
                            <div className="flex items-center gap-2">
                              <CircleFlag
                                width={16}
                                height={16}
                                countryCode={country.code}
                                alt={country.name}
                                title={country.name}
                              />
                              {country.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> شهر محل سکونت
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب شهر..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.name}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <FormLabel>کشورهای موردنظر</FormLabel>
                    <FormControl>
                      <MultiSelect
                        // options={countries.map((country) => ({
                        //   label: country.name,
                        //   value: country.code,
                        // }))}
                        options={[]}
                        defaultValue={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="انتخاب کشور..."
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
                    <FormLabel>روش‌های مهاجرت</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={[
                          { label: "تحصیلی", value: "study" },
                          { label: "کاری", value: "work" },
                          { label: "سرمایه‌گذاری", value: "investment" },
                          { label: "پناهندگی", value: "asylum" },
                        ]}
                        defaultValue={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="انتخاب روش..."
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
