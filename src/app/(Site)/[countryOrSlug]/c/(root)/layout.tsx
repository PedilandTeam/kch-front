import { AppMenuProvider } from "@/Providers/AppMenuProvider";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
