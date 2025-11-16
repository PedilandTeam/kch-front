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
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import { CircleFlag } from "next-circle-flags";
import { useEffect, useState } from "react";
import type { City, Country } from "@/schemas";
import fetchCountry from "@/api/fetchCountry";
import fetchCities from "@/api/fetchCities";
import { MultiSelect } from "@/components/ui-custom/MultiSelect";
import fetchUser from "@/api/fetchUser";
import type { User } from "@/schemas/user";
import fetchMethods from "@/api/fetchMethods";
import type { IMethod } from "@/types/methods";
import axios from "axios";
import { toast } from "sonner";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function ProfileForm() {
  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      isImmigrate: undefined,
      gender: undefined,
      birthYear: undefined,
      immigrationCountryIds: [],
      immigrateMethodIds: [],
    } as any,
  });

  const [user, setUser] = useState<User | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [methods, setMethods] = useState<IMethod[]>([]);

  useEffect(() => {
    async function loadUser() {
      const res = await fetchUser();

      if (res.ok) {
        console.log("res", res.user);
        setUser(res.user);

        form.reset({
          isImmigrate: res.user.isImmigrate,
          gender: (res.user.gender as "male" | "female" | "other") ?? undefined,
          birthYear: String(res.user.birthYear) ?? undefined,
          immigrationCountryIds:
            res.user.immigrationCountries.map((c) => c.id) ?? [],
          immigrateMethodIds: res.user.immigrateMethods.map((m) => m.id) ?? [],
          countryId: res.user.country?.id ?? undefined,
          cityId: res.user.city?.id ?? undefined,
        });
      }
    }

    loadUser();
  }, [form]);

  useEffect(() => {
    fetchCountry().then((countries) => {
      setCountries(countries);
    });

    fetchMethods().then((methods) => {
      setMethods(methods.data);
    });
  }, []);

  useEffect(() => {
    const countryId = form.getValues("countryId");

    if (countries.length > 0 && countryId) {
      const selectedCountry = countries.find((c) => c.id === countryId);
      if (selectedCountry) {
        fetchCities({
          countryCode: selectedCountry.code,
          limit: 1000,
          page: 1,
        }).then((res) => {
          setCities(res.items || []);
        });
      }
    }
  }, [countries, form.watch("countryId")]);

  const watchStatus = form.watch("isImmigrate");

  const updateHandler = async (values: AdsClubFormValues) => {
    try {
      const payload = {
        ...values,
        birthYear: values.birthYear ? Number(values.birthYear) : undefined,
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/data`,
        payload,
        {
          withCredentials: true,
        },
      );
      toast.success("تغییرات با موفقیت ذخیره شد.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطایی رخ داد.");
    } finally {
      console.log("SUBMITTED VALUES:", values);
    }
  };

  return (
    <Form {...form}>
      <Card className="border-blue-500/20 bg-blue-50/50 p-4">
        <form
          onSubmit={form.handleSubmit(updateHandler, (error) => {
            console.log("ERROR:", error);
          })}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="isImmigrate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="isImmigrate">وضعیت مهاجرت:</FormLabel>
                <FormControl>
                  <RadioGroup
                    dir="rtl"
                    value={String(field.value ?? false)}
                    className="flex gap-6"
                    disabled
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="true" />
                      <label htmlFor="true" className="text-sm">
                        مهاجرت کردم
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id="false" />
                      <label htmlFor="false" className="text-sm">
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
                  value={String(field.value) ?? ""}
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
                <FormLabel>
                  سال تولد میلادی:{" "}
                  <span className="text-muted-foreground text-sm leading-0">
                    (اختیاری، 5+ امتیاز)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    placeholder="مثال: 1990"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      field.onChange(val);

                      // if (val.length === 4 && !birthYearRewardGiven) {
                      //   addPoints(5);
                      //   markBirthYearReward(true);
                      // }

                      // if (val.length === 0 && birthYearRewardGiven) {
                      //   removePoints(5);
                      //   markBirthYearReward(false);
                      // }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchStatus === true && (
            <>
              <FormField
                control={form.control}
                name="countryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> کشور محل زندگی
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={(val) => {
                        const countryId = Number(val);
                        field.onChange(countryId);

                        const selectedCountry = countries.find(
                          (c) => c.id === countryId,
                        );

                        fetchCities({
                          countryCode: selectedCountry?.code || "",
                          limit: 1000,
                          page: 1,
                        }).then((res) => {
                          setCities(res.items || []);
                          form.setValue("cityId", undefined);
                        });
                      }}
                      value={field.value ? String(field.value) : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کشور..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem
                            key={country.id}
                            value={String(country.id)}
                          >
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
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> شهر محل سکونت
                    </FormLabel>
                    <Select
                      dir="rtl"
                      onValueChange={(val) => field.onChange(Number(val))}
                      value={field.value ? String(field.value) : ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب شهر..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={String(city.id)}>
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

          {watchStatus === false && (
            <>
              <FormField
                control={form.control}
                name="immigrationCountryIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کشورهای موردنظر</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={countries.map((country) => ({
                          key: country.id,
                          label: country.name,
                          value: country.id.toString(),
                        }))}
                        defaultValue={(field.value ?? []).map(String)}
                        onValueChange={(values) =>
                          field.onChange(values.map(Number))
                        }
                        placeholder="انتخاب کشور..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="immigrateMethodIds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>روش‌های مهاجرت</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={methods.map((method, index) => ({
                          key: index,
                          label: method.titleFa,
                          value: method.id.toString(),
                        }))}
                        defaultValue={(field.value ?? []).map(String)}
                        onValueChange={(values) =>
                          field.onChange(values.map(Number))
                        }
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
            <Button
              type="submit"
              className="w-full"
              onClick={() => console.log("BUTTON CLICKED")}
            >
              ذخیره تغییرات
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
}
