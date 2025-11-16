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
} from "@/components/ui";
import { adsClubSchema } from "@/schemas/adsClubRegister";
import { MultiSelect } from "@/components/ui-custom/MultiSelect";
import { useEffect, useState } from "react";
import fetchUser from "@/api/fetchUser";
import type { User } from "@/schemas/user";
import fetchAdCategories from "@/api/fetchAdCategories";
import type { AdCategory } from "@/types/adCategory";
import { Loader } from "@/components/ui-custom/Loader";

type AdsClubFormValues = z.infer<typeof adsClubSchema>;

export default function InterestsForm() {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<AdCategory[]>([]);

  const form = useForm<AdsClubFormValues>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      isImmigrate: true,
      favoriteAdCategoryIds: [],
    },
  });

  useEffect(() => {
    async function loadUser() {
      const res = await fetchUser();

      if (res.ok) {
        setUser(res.user);

        console.log("user", res.user);

        const favCats = res.user?.favoriteAdCategories ?? [];

        form.reset({
          favoriteAdCategoryIds: favCats.map((c) => c.id),
        });
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    fetchAdCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const interests = categories.filter((category) => category.parent === null);

  const updateHandler = (values: AdsClubFormValues) => {
    console.log("Updated profile:", values);
  };

  if (!user || categories.length === 0) {
    return <Loader />;
  }

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
                    defaultValue={(field.value || []).map(String)}
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
