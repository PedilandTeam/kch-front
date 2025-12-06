"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import { MultiSelect } from "@/components/ui-custom/MultiSelect";
import { useEffect, useState } from "react";
import fetchUser from "@/api/fetchUser";
import type { User } from "@/schemas/user";
import fetchAdCategories from "@/api/fetchAdCategories";
import type { AdCategory } from "@/types/adCategory";
import { Loader } from "@/components/ui-custom/Loader";
import fetchCountry from "@/api/fetchCountry";
import fetchMethods from "@/api/fetchMethods";
import type { Country } from "@/schemas";
import type { IMethod } from "@/types/methods";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function InterestsForm() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<AdCategory[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [methods, setMethods] = useState<IMethod[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      isImmigrate: true,
      favoriteAdCategoryIds: [],
      immigrationCountryIds: [],
      immigrateMethodIds: [],
    },
  });

  useEffect(() => {
    fetchAdCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const interests = categories.filter((category) => category.parent === null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetchUser();

      if (res.ok) {
        setUser(res.user);

        const favCats = res.user?.favoriteAdCategories ?? [];

        form.reset({
          isImmigrate: res.user.isImmigrate,
          immigrationCountryIds:
            res.user.immigrationCountries.map((c) => c.id) ?? [],
          immigrateMethodIds: res.user.immigrateMethods.map((m) => m.id) ?? [],
          favoriteAdCategoryIds: favCats.map((c) => c.id),
          birthYear: "",
        });

        form.setValue("countryId", res.user.country?.id, {
          shouldValidate: false,
        });

        form.setValue("cityId", res.user.city?.id, {
          shouldValidate: false,
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

  const updateHandler = async (values: AdsClubFormValues) => {
    setIsSubmitting(true);

    try {
      const payload = { ...values };

      delete payload.birthYear;

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
      const message = error.response?.data?.message[0];
      console.error("Error:", message);
      if (
        message ===
        "favoriteAdCategoryIds must contain no more than 10 elements"
      ) {
        form.setError("favoriteAdCategoryIds", {
          type: "manual",
          message: "حداکثر 10 علاقه‌مندی  می‌توانید انتخاب کنید.",
        });
      } else if (
        message ===
        "immigrationCountryIds must contain no more than 10 elements"
      ) {
        form.setError("immigrationCountryIds", {
          type: "manual",
          message: "حداکثر 10 کشور می‌توانید انتخاب کنید.",
        });
      } else {
        toast.error("خطایی در ثبت اطلاعات رخ داد.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchStatus = form.watch("isImmigrate");

  if (
    !user ||
    categories.length === 0 ||
    countries.length === 0 ||
    methods.length === 0
  ) {
    return <Loader />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(updateHandler)}
        className="flex flex-col gap-6"
      >
        {watchStatus === true && (
          <>
            <FormField
              control={form.control}
              name="favoriteAdCategoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>موضوعات مورد علاقه</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={interests.map((c) => ({
                        value: String(c.id),
                        label: c.name,
                      }))}
                      defaultValue={(field.value || [])
                        .map(String)
                        .filter((val) =>
                          interests.some((c) => String(c.id) === val),
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

            <input
              type="hidden"
              {...form.register("countryId")}
              value={form.getValues("countryId")}
            />

            <input
              type="hidden"
              {...form.register("cityId")}
              value={form.getValues("cityId")}
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
                      defaultValue={(field.value ?? [])
                        .map(String)
                        .filter((val) =>
                          countries.some((c) => String(c.id) === val),
                        )}
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
                      defaultValue={(field.value ?? [])
                        .map(String)
                        .filter((val) =>
                          methods.some((m) => String(m.id) === val),
                        )}
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
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            ذخیره تغییرات
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
