import { AppMenuProvider } from "@/components/layout/WrapAppMenu";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppMenuProvider>{children}</AppMenuProvider>;
}
