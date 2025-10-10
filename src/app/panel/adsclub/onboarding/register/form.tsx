"use client";

import { usePointsStore } from "@/store/usePointsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { adsClubRegisterSchema } from "@/schemas/adsClubRegister";

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

type AdsClubRegister = z.infer<typeof adsClubRegisterSchema>;

export default function RegisterForm() {
  const { addPoints } = usePointsStore();
  const [step, setStep] = useState<"status" | "details">("status");
  const router = useRouter();

  const form = useForm<AdsClubRegister>({
    resolver: zodResolver(adsClubRegisterSchema),
    defaultValues: {
      status: undefined,
      gender: undefined,
      birthYear: undefined,
      country: "",
      city: "",
      interests: [],
      destinations: [],
      methods: [],
    },
  });

  const watchStatus = form.watch("status");

  // Note: Removed automatic validation trigger to prevent premature form validation
  // Validation will only occur when user clicks submit button

  const addCredit = (field: any, value: any, plus: number) => {
    if (
      !field.value ||
      (Array.isArray(field.value) && field.value.length === 0)
    ) {
      addPoints(plus);
    }
    field.onChange(value);
  };

  const onSubmit = (values: AdsClubRegister) => {
    console.log("Form values:", values);
    toast.success("حساب کاربری شما با موفقیت فعال شد.");
    router.push("/panel/adsclub");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {/* پیام خوشامد */}
        <div className="text-primary space-y-1.5 rounded-xl border border-dashed border-blue-800/30 bg-blue-50 p-4">
          {step === "status" && (
            <>
              <h2 className="font-medium">Pedram عزیز،</h2>
              <p>
                به جمع کاربران ادزکلاب خوش آمدی. امیدواریم که بتونیم خدمات
                کاربردی رو بهت ارائه کنیم.
              </p>
              <p>
                لطفا موارد خواسته شده رو به دقت پاسخ بدید تا حساب کاربری‌تون
                براساس سلایق و نیازهای فعلی شما شخصی‌سازی بشه.
              </p>
            </>
          )}
          {step === "details" && (
            <>
              <h2 className="font-medium">تبریک میگم Pedram،</h2>
              <p>
                فقط یک قدم دیگه تا تکمیل ثبت نام و آماده شدن حساب کاربریت مونده.
              </p>
            </>
          )}
        </div>

        {/* STEP 1 */}
        {step === "status" && (
          <>
            {/* وضعیت مهاجرت */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500">*</span> وضعیت مهاجرت‌تون رو
                    مشخص کنید:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      dir="rtl"
                      onValueChange={(val) => {
                        addCredit(field, val, 5);
                        form.clearErrors("status");
                      }}
                      defaultValue={field.value}
                      className="flex flex-col gap-3 pt-2 pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="migrated" id="migrated" />
                        <label
                          className="text-primary text-sm font-medium"
                          htmlFor="migrated"
                        >
                          مهاجرت کردم
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="migrating" id="migrating" />
                        <label
                          className="text-primary text-sm font-medium"
                          htmlFor="migrating"
                        >
                          در حال مهاجرت هستم
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* جنسیت */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="mb-2">
                    جنسیت:{" "}
                    <span className="text-muted-foreground text-sm">
                      (5+ امتیاز)
                    </span>
                  </FormLabel>
                  <Select
                    dir="rtl"
                    onValueChange={(val) => {
                      addCredit(field, val, 5);
                      form.clearErrors("gender");
                    }}
                    defaultValue={field.value}
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

            {/* سال تولد */}
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    سال تولد (میلادی):{" "}
                    <span className="text-muted-foreground text-sm">
                      (5+ امتیاز)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="مثال: 1990"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (e.target.value) {
                          form.clearErrors("birthYear");
                        }
                      }}
                      onBlur={(e) => {
                        const year = Number(e.target.value);
                        if (year >= 1925 && year <= 2007 && !field.value) {
                          addPoints(5);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* STEP 2 */}
        {step === "details" && watchStatus === "migrated" && (
          <>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* در حال حاضر کدوم کشور زندگی میکنی؟</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: Germany"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (e.target.value.trim()) {
                          form.clearErrors("country");
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value && !field.value) {
                          addPoints(5);
                        }
                      }}
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
                  <FormLabel>
                    شهر محل سکونت:{" "}
                    <span className="text-muted-foreground text-sm font-normal">
                      (اختیاری | 5+ امتیاز)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: Berlin"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (e.target.value.trim()) {
                          form.clearErrors("city");
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value && !field.value) {
                          addPoints(5);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* دسته‌بندی‌های مورد علاقه</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: "ورزش", value: "sport" },
                        { label: "هنر", value: "art" },
                        { label: "تکنولوژی", value: "tech" },
                        { label: "گردشگری", value: "travel" },
                      ]}
                      value={field.value || []}
                      onChange={(vals) => {
                        const diff = vals.length - (field.value?.length || 0);
                        if (diff > 0) {
                          addPoints(diff);
                        }
                        field.onChange(vals);
                        if (vals.length > 0) {
                          form.clearErrors("interests");
                        }
                      }}
                      placeholder="انتخاب کنید..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === "details" && watchStatus === "migrating" && (
          <>
            <FormField
              control={form.control}
              name="destinations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>* مقاصد احتمالی مهاجرت:</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: "Germany", value: "germany" },
                        { label: "Canada", value: "canada" },
                        { label: "Australia", value: "australia" },
                        { label: "Sweden", value: "sweden" },
                      ]}
                      value={field.value || []}
                      onChange={(vals) => {
                        const diff = vals.length - (field.value?.length || 0);
                        if (diff > 0) {
                          addPoints(diff);
                        }
                        field.onChange(vals);
                        if (vals.length > 0) {
                          form.clearErrors("destinations");
                        }
                      }}
                      placeholder="انتخاب کنید..."
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
                  <FormLabel>* روش‌های مورد نظر برای مهاجرت:</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={[
                        { label: "تحصیل", value: "study" },
                        { label: "کار", value: "work" },
                        { label: "سرمایه‌گذاری", value: "investment" },
                        { label: "پناهندگی", value: "asylum" },
                      ]}
                      value={field.value || []}
                      onChange={(vals) => {
                        const diff = vals.length - (field.value?.length || 0);
                        if (diff > 0) {
                          addPoints(diff);
                        }
                        field.onChange(vals);
                        if (vals.length > 0) {
                          form.clearErrors("methods");
                        }
                      }}
                      placeholder="انتخاب کنید..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === "details" && <Button type="submit">ثبت فرم</Button>}
      </form>

      {step === "status" && (
        <Button
          type="button"
          onClick={() => {
            form.trigger("status").then((valid) => {
              if (valid) setStep("details");
            });
          }}
        >
          ادامه
        </Button>
      )}
    </Form>
  );
}
