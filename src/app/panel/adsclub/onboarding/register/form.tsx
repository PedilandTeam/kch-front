"use client";

import { adsClubSchema } from "@/schemas/adsClubRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Button,
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  RadioGroup,
  RadioGroupItem,
  MultiSelect,
} from "@components";
import type { City, Country } from "@/schemas";
import fetchCountry from "@/api/fetchCountry";
import { CircleFlag } from "next-circle-flags";
import fetchCities from "@/api/fetchCities";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"status" | "details">("status");

  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCountry().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      status: undefined,
      gender: undefined,
      birthYear: "",
      country: "",
      city: "",
      interests: [],
      destinations: [],
      methods: [],
    },
  });

  const watchStatus = form.watch("status");

  const onSubmit = (values: AdsClubFormValues) => {
    console.log("FINAL VALUES:", values);
    toast.success("حساب کاربری شما با موفقیت فعال شد.");
    // router.push("/panel/adsclub");
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* ─────────────── STEP 1 ─────────────── */}
        {step === "status" && (
          <>
            <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
              <h2 className="font-medium">Pedram عزیز،</h2>
              <p className="text-[15px]">
                لطفاً وضعیت مهاجرت و اطلاعات اولیه را تکمیل کنید.
              </p>
            </div>

            {/* STATUS */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">*</span> وضعیت مهاجرت:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="migrated" id="migrated" />
                        <label htmlFor="migrated">مهاجرت کرده‌ام</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="migrating" id="migrating" />
                        <label htmlFor="migrating">در حال مهاجرت هستم</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* GENDER */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>جنسیت:</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={field.onChange}
                    value={field.value || ""}
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
                </FormItem>
              )}
            />

            {/* BIRTH YEAR */}
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>سال تولد (میلادی):</FormLabel>
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
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full"
              onClick={() => setStep("details")}
            >
              ادامه
            </Button>
          </>
        )}

        {/* ─────────────── STEP 2 ─────────────── */}
        {step === "details" && (
          <>
            <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
              <h2 className="font-medium">تبریک می‌گم Pedram،</h2>
              <p className="text-[15px]">
                فقط یک قدم دیگه تا پایان باقی مونده!
              </p>
            </div>

            {/* If migrating */}
            {watchStatus === "migrating" && (
              <>
                <FormField
                  control={form.control}
                  name="destinations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> کشورهای موردنظر
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={countries.map((country) => ({
                            label: country.name,
                            value: country.code,
                          }))}
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
                      <FormLabel>
                        <span className="text-red-500">*</span> روش‌های مهاجرت
                      </FormLabel>
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

            {/* If migrated */}
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

                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span className="text-red-500">*</span> موضوعات مورد
                        علاقه
                      </FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={[
                            { label: "رویدادها و کنسرت", value: "art" },
                            { label: "خدمات حقوقی و بیمه", value: "sport" },
                            { label: "خدمات مالی و بانکی", value: "tech" },
                            { label: "کافه، بار و رستوران", value: "travel" },
                            { label: "پزشک و داروخانه", value: "food" },
                          ]}
                          defaultValue={field.value || []}
                          onValueChange={field.onChange}
                          placeholder="انتخاب کنید..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full">
              ثبت فرم
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
