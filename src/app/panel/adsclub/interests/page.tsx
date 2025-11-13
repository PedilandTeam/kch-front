"use client";

import { PageHeader } from "@/components/panel/PageHeader";
import InterestsForm from "./InterestsForm";

export default function InterestsPage() {
  return (
    <div className="space-y-5">
      <PageHeader icon="FolderSimpleStarIcon" title="علاقه‌مندی‌ها">
        از این بخش می توانید لیست علاقه‌مندی‌های خود را مدیریت نمایید.
      </PageHeader>

      <InterestsForm />
    </div>
  );
}
