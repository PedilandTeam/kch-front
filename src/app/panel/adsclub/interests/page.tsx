"use client";

import { PageHeader } from "@/components/panel/PageHeader";
import InterestsForm from "./InterestsForm";

export default function InterestsPage() {
  return (
    <div className="space-y-5">
      <PageHeader icon="FolderSimpleStarIcon" title="مدیریت علاقه‌مندی‌ها">
        از این بخش می‌توانید لیست علاقه‌مندی‌های خود را ویرایش کنید. توجه داشته
        باشید که فقط آگهی‌هایی برای شما ارسال می‌شود که با علاقه‌مندی‌های
        انتخابی‌تان مطابقت داشته باشند.
      </PageHeader>

      <InterestsForm />
    </div>
  );
}
