import { AppMenuProvider } from "@/_providers/AppMenuProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
