import { AppMenuProvider } from "@/Providers/AppMenuProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
