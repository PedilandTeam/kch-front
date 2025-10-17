import { AppMenuProvider } from "@/providers/AppMenuProvider";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
