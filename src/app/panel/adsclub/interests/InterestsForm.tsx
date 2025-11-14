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

type AdsClubRegister = z.infer<typeof adsClubSchema>;

export default function InterestsForm() {
  const form = useForm<AdsClubRegister>({
    resolver: zodResolver(adsClubSchema),
    defaultValues: {
      interests: ["tech", "art"],
    },
  });

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
            name="interests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>موضوعات مورد علاقه</FormLabel>
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
