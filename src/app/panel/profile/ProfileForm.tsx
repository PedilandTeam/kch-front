"use client";

import fetchCities from "@/api/fetchCities";
import fetchCountry from "@/api/fetchCountry";
import fetchUser from "@/api/fetchUser";
import type { City, Country } from "@/schemas";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import type { User } from "@/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CircleFlag } from "next-circle-flags";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Loader } from "@/components/ui-custom/Loader";
import { Spinner } from "@/components/ui/spinner";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function ProfileForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      isImmigrate: undefined,
      gender: undefined,
      birthYear: undefined,
      immigrationCountryIds: [],
      immigrateMethodIds: [],
      countryId: undefined,
      cityId: undefined,
      favoriteAdCategoryIds: [],
    } as any,
  });

  useEffect(() => {
    async function loadUser() {
      const res = await fetchUser();

      console.log("user", res);

      if (res.ok) {
        setUser(res.user);

        form.reset({
          isImmigrate: res.user.isImmigrate,
          gender: res.user.gender === null ? null : res.user.gender,
          birthYear: res.user.birthYear ? String(res.user.birthYear) : "",
          countryId: res.user.country?.id ?? undefined,
          cityId: res.user.city?.id ?? undefined,
        });

        form.setValue(
          "favoriteAdCategoryIds",
          res.user.favoriteAdCategories.map((c) => c.id),
          { shouldValidate: false },
        );

        form.setValue(
          "immigrationCountryIds",
          res.user.immigrationCountries.map((c) => c.id),
          { shouldValidate: false },
        );

        form.setValue(
          "immigrateMethodIds",
          res.user.immigrateMethods.map((m) => m.id),
          { shouldValidate: false },
        );
      }

      setIsLoading(false);
    }

    loadUser();
  }, [form]);

  useEffect(() => {
    fetchCountry().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const watchCountryId = form.watch("countryId");

  useEffect(() => {
    if (!watchCountryId) {
      setCities([]);
      return;
    }

    const selectedCountry = countries.find(
      (c) => c.id === Number(watchCountryId),
    );

    if (selectedCountry) {
      fetchCities({
        countryCode: selectedCountry.code,
        limit: 1000,
        page: 1,
      }).then((res) => setCities(res.items || []));
    }
  }, [watchCountryId, countries]);

  const watchStatus = form.watch("isImmigrate");

  const updateHandler = async (values: AdsClubFormValues) => {
    setIsSubmitting(true);

    try {
      const cleanedBirthYear =
        typeof values.birthYear === "number" ? values.birthYear : null;

      const cleanedGender =
        values.gender && values.gender.trim() !== "" ? values.gender : null;

      const payload = {
        ...values,
        birthYear: cleanedBirthYear,
        gender: cleanedGender,
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user/data`,
        payload,
        {
          withCredentials: true,
        },
      );
      router.push("/panel/adsclub");
      toast.success("تغییرات با موفقیت ذخیره شد.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطایی رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startYear = 2007;
  const yearsCount = 90;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <Card className="border-blue-500/20 bg-blue-50/50 p-4">
        <form
          onSubmit={form.handleSubmit(updateHandler)}
          className="flex flex-col gap-3"
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
                <FormLabel htmlFor="gender">
                  جنسیت{" "}
                  <span className="text-muted-foreground text-sm leading-0">
                    (اختیاری، 10+ امتیاز)
                  </span>
                </FormLabel>
                <Select
                  value={
                    field.value === null
                      ? ""
                      : field.value === undefined
                        ? ""
                        : field.value
                  }
                  onValueChange={(v) =>
                    field.onChange(v === "unknown" ? null : v)
                  }
                  dir="rtl"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="unknown">نامشخص</SelectItem>
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
                <FormLabel>سال تولد میلادی</FormLabel>
                <FormControl>
                  <Select
                    dir="rtl"
                    value={
                      field.value === null || field.value === undefined
                        ? "" // ← لازم برای placeholder
                        : String(field.value)
                    }
                    onValueChange={(val) => {
                      if (val === "" || val === "unknown") {
                        field.onChange(null);
                        return;
                      }

                      const num = Number(val);
                      field.onChange(Number.isNaN(num) ? null : num);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>

                    <SelectContent className="max-h-60">
                      <SelectItem value="unknown">نامشخص</SelectItem>

                      {Array.from({ length: yearsCount + 1 }, (_, i) => {
                        const year = startYear - i;
                        return (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
                    <FormControl>
                      <Select
                        dir="rtl"
                        value={field.value ? String(field.value) : ""}
                        onValueChange={async (val) => {
                          const countryId = Number(val);

                          form.setValue("cityId", null);
                          setCities([]);

                          field.onChange(countryId);

                          const selectedCountry = countries.find(
                            (c) => c.id === countryId,
                          );
                          if (selectedCountry) {
                            const res = await fetchCities({
                              countryCode: selectedCountry.code,
                              limit: 1000,
                              page: 1,
                            });
                            setCities(res.items || []);
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب کشور..." />
                        </SelectTrigger>
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
                    </FormControl>
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
                      value={
                        field.value === null || field.value === undefined
                          ? ""
                          : String(field.value)
                      }
                      onValueChange={(val) => {
                        if (!val) {
                          field.onChange(undefined);
                          return;
                        }
                        field.onChange(Number(val));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب شهر..." />
                      </SelectTrigger>
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

              <input
                type="hidden"
                {...form.register("favoriteAdCategoryIds")}
                value={JSON.stringify(
                  form.getValues("favoriteAdCategoryIds") || [],
                )}
              />
            </>
          )}

          {watchStatus === false && (
            <>
              <input
                type="hidden"
                {...form.register("immigrationCountryIds")}
                value={JSON.stringify(
                  form.getValues("immigrationCountryIds") || [],
                )}
              />
              <input
                type="hidden"
                {...form.register("immigrateMethodIds")}
                value={JSON.stringify(
                  form.getValues("immigrateMethodIds") || [],
                )}
              />
            </>
          )}

          <div className="mt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              ذخیره تغییرات
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
}
