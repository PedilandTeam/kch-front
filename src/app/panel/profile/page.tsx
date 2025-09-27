import { PageHeader } from "@/components/panel/PageHeader";

export default function ProfilePage() {
  return (
    <div className="space-y-5 p-4">
      <PageHeader icon="UserListIcon" title="حساب کاربری">
        این صفحه شامل تمام اطلاعات حساب کاربری شماست.
      </PageHeader>
    </div>
  );
}
