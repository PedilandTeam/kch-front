"use client";

import fetchAdCategories from "@/api/fetchAdCategories";
import fetchCities from "@/api/fetchCities";
import fetchCountry from "@/api/fetchCountry";
import fetchMethods from "@/api/fetchMethods";
import type { City, Country } from "@/schemas";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import { usePointsStore } from "@/store/usePointsStore";
import { useTelegramAuth } from "@/store/useTelegramAuth";
import type { AdCategory } from "@/types/adCategory";
import type { IMethod } from "@/types/methods";
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
import { MultiSelect } from "@/components/ui-custom/MultiSelect";
import { Spinner } from "@/components/ui/spinner";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"status" | "details">("status");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<AdCategory[]>([]);
  const [methods, setMethods] = useState<IMethod[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    addPoints,
    removePoints,
    genderRewardGiven,
    markGenderReward,
    birthYearRewardGiven,
    markBirthYearReward,
    hasHydrated,
    resetPoints,
  } = usePointsStore((state) => state);

  const { userData } = useTelegramAuth();
  const userFullName = `${userData?.user?.first_name} ${userData?.user?.last_name}`;

  useEffect(() => {
    if (!hasHydrated) return;

    resetPoints(50);
  }, [hasHydrated]);

  useEffect(() => {
    fetchCountry().then((countries) => {
      setCountries(countries);
    });

    fetchAdCategories().then((categories) => {
      setCategories(categories);
    });

    fetchMethods().then((methods) => {
      setMethods(methods.data);
    });
  }, []);

  const interests = categories.filter((category) => category.parent === null);

  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      isImmigrate: true,
      gender: undefined,
      birthYear: undefined,

      countryId: undefined,
      cityId: undefined,
      favoriteAdCategoryIds: [],

      immigrationCountryIds: [],
      immigrateMethodIds: [],
    },
  });

  const watchStatus = form.watch("isImmigrate");

  const onSubmit = async (values: AdsClubFormValues) => {
    try {
      setIsSubmitting(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/adsclub/completeOnboarding`,
        values,
        {
          withCredentials: true,
        },
      );

      toast.success("حساب کاربری شما با موفقیت فعال شد.");
      router.push("/panel/adsclub");
    } catch (error) {
      console.error("Error:", error);
      toast.error("خطایی رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log(errors);
        })}
      >
        {step === "status" && (
          <>
            <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
              <h2 className="font-medium">{userFullName} عزیز،</h2>
              <p className="text-[15px]">
                لطفاً وضعیت مهاجرت و اطلاعات اولیه خود را تکمیل کنید.
              </p>
            </div>

            {/* Is Immigrate */}
            <FormField
              control={form.control}
              name="isImmigrate"
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormLabel>
                      <span className="text-red-500">*</span> وضعیت مهاجرت:
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        dir="rtl"
                        value={
                          field.value === true
                            ? "true"
                            : field.value === false
                              ? "false"
                              : ""
                        }
                        onValueChange={(value) => {
                          if (value === "true") field.onChange(true);
                          else if (value === "false") field.onChange(false);
                          else field.onChange(undefined);
                        }}
                        className="flex gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="true"
                            id="migrated"
                            error={!!fieldState.error}
                          />
                          <label htmlFor="migrated">مهاجرت کرده‌ام</label>
                        </div>

                        <div className="flex items-center gap-2">
                          <RadioGroupItem
                            value="false"
                            id="migrating"
                            error={!!fieldState.error}
                          />
                          <label htmlFor="migrating">در حال مهاجرت هستم</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    جنسیت:{" "}
                    <span className="text-muted-foreground text-sm leading-0">
                      (اختیاری، 5+ امتیاز)
                    </span>
                  </FormLabel>
                  <Select
                    dir="rtl"
                    value={field.value ?? ""}
                    onValueChange={(value) => {
                      if (value === "none") {
                        removePoints(5);
                        markGenderReward(false);
                      }

                      field.onChange(value || undefined);

                      if (value && !genderRewardGiven) {
                        addPoints(5);
                        markGenderReward(true);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">انتخاب کنید</SelectItem>
                      <SelectItem value="male">مرد</SelectItem>
                      <SelectItem value="female">زن</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* BIRTH YEAR */}
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
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        field.onChange(val);

                        if (val.length === 4 && !birthYearRewardGiven) {
                          addPoints(5);
                          markBirthYearReward(true);
                        }

                        if (val.length === 0 && birthYearRewardGiven) {
                          removePoints(5);
                          markBirthYearReward(false);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={() => setStep("details")}>
              ادامه
            </Button>
          </>
        )}

        {step === "details" && (
          <>
            <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
              <h2 className="font-medium">
                تبریک می‌گم {userData?.user?.first_name}،
              </h2>
              <p className="text-[15px]">
                فقط یک قدم دیگه تا تکمیل ثبت نام تون باقی مونده!
              </p>
            </div>

            {/* If migrated */}
            {watchStatus === true && (
              <>
                <FormField
                  control={form.control}
                  name="countryId"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> کشور محل زندگی
                      </FormLabel>
                      <FormControl>
                        <Select
                          dir="rtl"
                          value={
                            field.value !== undefined ? String(field.value) : ""
                          }
                          onValueChange={(val) => {
                            if (!val) {
                              field.onChange(undefined);
                              return;
                            }

                            const numberVal = Number(val);
                            if (Number.isNaN(numberVal)) {
                              field.onChange(undefined);
                              return;
                            }

                            field.onChange(numberVal);

                            const country = countries.find(
                              (c) => c.id === numberVal,
                            );

                            fetchCities({
                              countryCode: country?.code ?? "",
                              limit: 1000,
                              page: 1,
                            }).then((res) => {
                              setCities(res.items || []);
                              form.setValue("cityId", undefined);
                            });
                          }}
                        >
                          <SelectTrigger error={!!fieldState.error}>
                            <SelectValue placeholder="انتخاب کشور..." />
                          </SelectTrigger>

                          <SelectContent className="max-h-60">
                            {countries.map((country) => (
                              <SelectItem
                                key={country.id}
                                value={country.id.toString()}
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
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> شهر محل سکونت
                      </FormLabel>
                      <FormControl>
                        <Select
                          dir="rtl"
                          value={
                            field.value !== undefined ? String(field.value) : ""
                          }
                          onValueChange={(val) => {
                            if (!val) {
                              field.onChange(undefined);
                              return;
                            }

                            const numberVal = Number(val);
                            if (Number.isNaN(numberVal)) {
                              field.onChange(undefined);
                              return;
                            }

                            field.onChange(numberVal);
                          }}
                        >
                          <SelectTrigger
                            error={!!fieldState.error}
                            disabled={!cities.length}
                          >
                            <SelectValue placeholder="انتخاب شهر..." />
                          </SelectTrigger>

                          <SelectContent className="max-h-60 overflow-y-auto">
                            {cities.map((city) => (
                              <SelectItem
                                key={city.id}
                                value={city.id.toString()}
                              >
                                {city.name}
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
                  name="favoriteAdCategoryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> موضوعات مورد
                        علاقه
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={interests.map((category, index) => ({
                            key: index,
                            label: category.name,
                            value: category.id.toString(),
                          }))}
                          defaultValue={(field.value ?? []).map((id) =>
                            id.toString(),
                          )}
                          onValueChange={(values) =>
                            field.onChange(values.map(Number))
                          }
                          placeholder="انتخاب کنید..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* If migrating */}
            {watchStatus === false && (
              <>
                <FormField
                  control={form.control}
                  name="immigrationCountryIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> کشورهای موردنظر
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={countries.map((country, index) => ({
                            key: index,
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
                      <FormLabel>
                        <span className="text-red-500">*</span> روش‌های مهاجرت
                      </FormLabel>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              تکمیل ثبت نام
              {isSubmitting && <Spinner />}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
