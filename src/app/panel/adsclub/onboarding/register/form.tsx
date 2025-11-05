"use client";

import {
  adsClubStep1Schema,
  adsClubStep2Schema,
  type AdsClubStep1,
  type AdsClubStep2,
} from "@/schemas/adsClubRegister";
import { usePointsStore } from "@/store/usePointsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Button,
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

export default function RegisterForm() {
  const { addPoints } = usePointsStore();
  const [step, setStep] = useState<"status" | "details">("status");
  const router = useRouter();

  // 🔹 مرحله ۱
  const formStep1 = useForm<AdsClubStep1>({
    resolver: zodResolver(adsClubStep1Schema),
    defaultValues: {
      status: undefined,
      gender: undefined,
      birthYear: "",
    },
    mode: "onSubmit",
  });

  // 🔹 مرحله ۲
  const formStep2 = useForm<AdsClubStep2>({
    resolver: zodResolver(adsClubStep2Schema),
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
    mode: "onSubmit",
  });

  const watchStatus = formStep2.watch("status");

  const addCredit = (field: any, value: any, plus: number) => {
    if (
      !field.value ||
      (Array.isArray(field.value) && field.value.length === 0)
    )
      addPoints(plus);
    field.onChange(value);
  };

  const onSubmitStep2 = (values: AdsClubStep2) => {
    console.log("✅ Final values:", values);
    toast.success("حساب کاربری شما با موفقیت فعال شد.");
    router.push("/panel/adsclub");
  };

  /* ─────────────── مرحله ۱ ─────────────── */
  if (step === "status") {
    return (
      <Form {...formStep1}>
        <form
          onSubmit={formStep1.handleSubmit((data) => {
            const status = data.status;
            if (status) {
              formStep2.setValue("status", status);
              setStep("details");
            }
          })}
          className="space-y-4"
        >
          <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
            <h2 className="font-medium">Pedram عزیز،</h2>
            <p className="text-[15px]">
              لطفاً وضعیت مهاجرت و اطلاعات اولیه را تکمیل کنید.
            </p>
          </div>

          <FormField
            control={formStep1.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="text-red-500">*</span> وضعیت مهاجرت:
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    dir="rtl"
                    onValueChange={(val) => addCredit(field, val, 5)}
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

          <FormField
            control={formStep1.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>جنسیت:</FormLabel>
                <Select
                  dir="rtl"
                  onValueChange={(val) => addCredit(field, val, 5)}
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

          <FormField
            control={formStep1.control}
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
                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                      field.onChange(val);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">ادامه</Button>
        </form>
      </Form>
    );
  }

  return (
    <Form {...formStep2}>
      <form
        onSubmit={formStep2.handleSubmit(onSubmitStep2)}
        className="space-y-4"
      >
        <div className="text-primary space-y-1 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
          <h2 className="font-medium">تبریک می‌گم Pedram،</h2>
          <p className="text-[15px]">فقط یک قدم دیگه تا پایان باقی مونده!</p>
        </div>

        {watchStatus === "migrating" && (
          <>
            <FormField
              control={formStep2.control}
              name="destinations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><span className="text-red-500">*</span> کشورهای موردنظر</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: "آلمان", value: "germany" },
                        { label: "کانادا", value: "canada" },
                        { label: "استرالیا", value: "australia" },
                        { label: "سوئد", value: "sweden" },
                        { label: "هلند", value: "netherlands" },
                      ]}
                      defaultValue={field.value || []}
                      onValueChange={(vals) => field.onChange(vals)}
                      placeholder="انتخاب کشور..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formStep2.control}
              name="methods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><span className="text-red-500">*</span> روش‌های مهاجرت</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: "تحصیلی", value: "study" },
                        { label: "کاری", value: "work" },
                        { label: "سرمایه‌گذاری", value: "investment" },
                        { label: "پناهندگی", value: "asylum" },
                      ]}
                      defaultValue={field.value || []}
                      onValueChange={(vals) => field.onChange(vals)}
                      placeholder="انتخاب روش..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {watchStatus === "migrated" && (
          <>
            <FormField
              control={formStep2.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><span className="text-red-500">*</span> کشور محل زندگی</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب کشور..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="germany">آلمان</SelectItem>
                      <SelectItem value="austria">اتریش</SelectItem>
                      <SelectItem value="sweden">سوئد</SelectItem>
                      <SelectItem value="canada">کانادا</SelectItem>
                      <SelectItem value="netherlands">هلند</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formStep2.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><span className="text-red-500">*</span> شهر محل سکونت</FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={(val) => field.onChange(val)}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب شهر..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="berlin">برلین</SelectItem>
                      <SelectItem value="hamburg">هامبورگ</SelectItem>
                      <SelectItem value="munich">مونیخ</SelectItem>
                      <SelectItem value="vienna">وین</SelectItem>
                      <SelectItem value="stockholm">استکهلم</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formStep2.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><span className="text-red-500">*</span> موضوعات مورد علاقه</FormLabel>
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
                      onValueChange={(vals) => field.onChange(vals)}
                      placeholder="انتخاب کنید..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full">ثبت فرم</Button>
      </form>
    </Form>
  );
}
