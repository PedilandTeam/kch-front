"use client";

import { PageHeader } from "@/components/panel/PageHeader";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <PageHeader icon="UserListIcon" title="حساب کاربری">
        این صفحه شامل تمام اطلاعات حساب کاربری شماست.
      </PageHeader>

      <ProfileForm />
    </div>
  );
}
