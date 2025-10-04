import Link from "next/link";

export default function AdsclubPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <div>لندینگ پیج ادزکلاب</div>
      <Link href="/join/adsclub/intro">عضویت در ادزکلاب</Link>
    </main>
  );
}
