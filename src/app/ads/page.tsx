import { Button } from "@/components/ui";
import Link from "next/link";

export default function AdsPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1>این صفحه تبلیغات است</h1>

      <div>
        <Button asChild>
          <Link href="/register">ثبت نام</Link>
        </Button>
      </div>
    </main>
  );
}
