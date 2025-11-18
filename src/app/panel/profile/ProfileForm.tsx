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

      if (res.ok) {
        setUser(res.user);

        form.reset({
          isImmigrate: res.user.isImmigrate,
          gender: (res.user.gender as "male" | "female" | "other") ?? undefined,
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
    setIsSubmitting(true);

    try {
      const cleanedBirthYear =
        values.birthYear && values.birthYear.trim() !== ""
          ? Number(values.birthYear)
          : null;

      const payload = {
        ...values,
        birthYear: cleanedBirthYear,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <Card className="border-blue-500/20 bg-blue-50/50 p-4">
        <form
          onSubmit={form.handleSubmit(updateHandler, (error) => {
            console.log("ّّForm ERROR:", error);
          })}
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
